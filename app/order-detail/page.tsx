"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import api from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useSnap } from "../../hooks/useSnap";

function OrderDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("nama") || "";
  const email = searchParams.get("email") || "";
  const voucher = searchParams.get("voucher") || "";
  const duration = parseFloat(searchParams.get("durasi") || "1");
  const psId = searchParams.get("psId");
  const psName = searchParams.get("psName");
  const psType = searchParams.get("psType") || "PS4";

  // Pricing based on PS Type (per hour = 2 slots)
  // PS4: 25k/slot -> 50k/hour
  // PS5: 30k/slot -> 60k/hour
  const pricePerHour = psType.toUpperCase().includes("PS5") ? 60000 : 50000;
  // For testing: 1 minute (0.017 hours) uses minimum 1 slot pricing
  const subtotal = duration < 0.5 ? (pricePerHour / 2) : pricePerHour * duration;

  const [discount, setDiscount] = useState(0);
  const [voucherStatus, setVoucherStatus] = useState<couponStatus>(
    voucher ? "unused" : "unused",
  );

  useEffect(() => {
    if (!voucher) {
      setVoucherStatus("unused");
      setDiscount(0);
      return;
    }

    const validateVoucher = async () => {
      try {
        // Endpoint assumption: GET /api/promo-codes/validate?code=...
        const response = await api.get("/promo-codes/validate", {
          params: { code: voucher },
        });

        if (response.data.valid && response.data.promoCode) {
          const { tipeDiskon, nilaiDiskon } = response.data.promoCode;
          let disc = 0;
          if (tipeDiskon === "PERCENTAGE") {
            disc = (subtotal * Number(nilaiDiskon)) / 100;
          } else {
            disc = Number(nilaiDiskon);
          }
          setDiscount(disc);
          setVoucherStatus("valid");
        } else {
          setDiscount(0);
          setVoucherStatus("invalid");
        }
      } catch (error) {
        console.error("Error validating voucher:", error);
        setDiscount(0);
        setVoucherStatus("invalid");
      }
    };

    validateVoucher();
  }, [voucher, subtotal]);

  const total = subtotal - discount;

  const [loading, setLoading] = useState(false);
  const [existingBookingId, setExistingBookingId] = useState<number | null>(
    null,
  );
  const { snapPay } = useSnap();

  const handlePayment = async () => {
    if (!psId) {
      toast.error("Invalid order details");
      return;
    }

    setLoading(true);
    try {
      let bookingId = existingBookingId;

      // 1. Create Booking (only if not already created)
      if (!bookingId) {
        // waktuMulai must be in the future. Adding 1 minute buffer.
        const startTime = new Date(Date.now() + 60 * 1000).toISOString();

        // Convert duration to slots (30 min per slot)
        // For testing: 1 minute (0.017 hours) = 1 slot minimum
        const jumlahSlot = duration < 0.5 ? 1 : Math.ceil(duration * 2);

        const bookingResponse = await api.post("/bookings", {
          namaPanggilan: name,
          email: email,
          playstationId: parseInt(psId),
          waktuMulai: startTime,
          jumlahSlot: jumlahSlot, // 30 min slots, minimum 1 slot for testing
          kodePromo: voucher || undefined,
        });

        const booking = bookingResponse.data.booking;
        bookingId = booking.id;
        setExistingBookingId(bookingId);
        // Save to localStorage for payment-success page
        if (bookingId) {
          localStorage.setItem('lastBookingId', bookingId.toString());
          // Save actual duration in hours for testing (1 minute = 0.017 hours)
          localStorage.setItem('lastBookingDuration', duration.toString());
        }
      }

      // 2. Initiate Payment
      let snapToken;
      let midtransOrderId;

      try {
        const paymentResponse = await api.post("/payments/create", {
          bookingId: bookingId,
        });
        snapToken = paymentResponse.data.payment.snapToken;
        midtransOrderId = paymentResponse.data.payment.midtransOrderId;
      } catch (error: any) {
        if (
          error.response &&
          error.response.status === 409 &&
          error.response.data.payment
        ) {
          if (error.response.data.payment.status === "FAILED") {
            toast.error("Pembayaran kadaluarsa. Silakan pesan ulang.");
            router.push("/");
            return;
          }

          // Reuse existing payment
          console.log("Reusing existing payment:", error.response.data.payment);
          snapToken = error.response.data.payment.snapToken;
          midtransOrderId = error.response.data.payment.midtransOrderId;

          if (!snapToken) {
            throw new Error("Existing payment found but no token available.");
          }
        } else {
          throw error;
        }
      }

      // 3. Open Snap
      snapPay(snapToken, {
        onSuccess: async (result) => {
          toast.success("Payment success! Verifying...");
          console.log("Snap Success:", result);

          try {
            // Immediately check status with backend to update DB
            await api.get(`/payments/check-status?orderId=${midtransOrderId}`);
            toast.success("Payment verified!");
          } catch (error) {
            console.error("Error verifying payment status:", error);
          }

          // Save bookingId to localStorage before redirect
          if (bookingId) {
            localStorage.setItem('lastBookingId', bookingId.toString());
            router.push(`/payment-success?bookingId=${bookingId}`);
          } else {
            router.push('/payment-success');
          }
        },
        onPending: async (result) => {
          toast("Waiting for your payment!", { icon: "⏳" });
          console.log("Snap Pending:", result);

          try {
            await api.get(`/payments/check-status?orderId=${midtransOrderId}`);
          } catch (error) {
            console.error("Error checking payment status:", error);
          }

          // Do not redirect to success on pending.
          // The user might have closed the popup after selecting a method (e.g. VA).
          // We let them stay here or they can check their email/transactions later.
        },
        onError: (result) => {
          toast.error("Payment failed!");
          console.log("Snap Error:", result);
          router.push("/payment-failed");
        },
        onClose: () => {
          toast("You closed the popup without finishing the payment", {
            icon: "⚠️",
          });
        },
      });
    } catch (error: any) {
      console.error("Payment error:", error);

      if (
        error.response?.status === 400 &&
        error.response?.data?.currentPaymentStatus === "FAILED"
      ) {
        toast.error("Pembayaran kadaluarsa. Silakan pesan ulang.");
        router.push("/");
        return;
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to process payment.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // let status: couponStatus = voucher ? "valid" : "unused"; // Simplified logic

  return (
    <div className="flex flex-col items-center gap-10">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="font-inter text-blue-purple text-3xl font-bold sm:text-4xl md:text-5xl">
        Order Summary
      </h1>

      <div className="mb-2 flex min-h-10 w-10/12 flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full max-w-md flex-col md:w-6/12 md:max-w-full">
          <div className="flex w-full flex-col gap-2 text-base sm:text-lg">
            <label className="font-inter font-semibold">Nama</label>
            <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
              {name}
            </div>

            <label className="font-inter font-semibold">E-mail</label>
            <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
              {email}
            </div>

            <label className="font-inter font-semibold">Voucher</label>
            <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
              {voucher || "-"}
            </div>

            <label className="font-inter font-semibold">Durasi</label>
            <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
              {duration < 0.5 ? "1 Menit (Testing)" : `${duration} Jam`}
            </div>

            <label className="font-inter font-semibold">PlayStation</label>
            <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
              {psName}
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col md:w-6/12 md:max-w-full">
          <div className="text-inter border-blue-purple rounded-xl border p-5 text-base sm:p-8 sm:text-lg md:p-10">
            <div className="mb-2 flex w-full justify-between">
              <p>Date</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>

            <div className="mb-5 flex w-full justify-between">
              <p>Time</p>
              <p>{new Date().toLocaleTimeString()}</p>
            </div>

            <div className="mb-2 flex w-full justify-between font-bold">
              <p>Produk</p>
              <p>Qty</p>
            </div>

            <div className="mb-5 flex w-full justify-between">
              <p>Rental PS ({duration < 0.5 ? "1 Menit (Testing)" : `${duration} Jam`})</p>
              <p>1x</p>
            </div>

            <div className="mb-2 flex w-full justify-between">
              <p>Kode Voucher</p>
            </div>

            <Coupon status={voucherStatus} />

            <div className="mb-2 flex w-full justify-between">
              <p>Subtotal</p>
              <p>Rp {subtotal.toLocaleString()}</p>
            </div>
            <div className="mb-5 flex w-full justify-between">
              <p>Subtotal Voucher</p>
              <p>- Rp {discount.toLocaleString()}</p>
            </div>

            <div className="mb-5 flex w-full justify-between font-bold">
              <p>Total</p>
              <p>Rp {total.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-24 flex justify-center">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="bg-lavender font-inter mt-10 rounded-lg px-16 py-2 text-lg font-bold text-white disabled:opacity-50"
            >
              {loading ? "Processing..." : "Bayar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetailContent />
    </Suspense>
  );
}

type couponStatus = "valid" | "invalid" | "unused";

interface CouponProps {
  status: couponStatus;
}

function Coupon({ status }: CouponProps) {
  const colormap = {
    valid: "border-green-success text-green-success",
    invalid: "border-red-500 text-red-500",
    unused: "border-[#D0D5DD] text-[#D0D5DD]",
  } as const;

  return (
    <div
      className={`mb-10 flex justify-end rounded-md border p-2 ${colormap[status]}`}
    >
      <p className="font-fira-code text-base sm:text-lg">
        {status == "valid"
          ? "COUPON APPLIED"
          : status == "invalid"
            ? "COUPON INVALID"
            : "NO COUPON INSERTED"}
      </p>
    </div>
  );
}
