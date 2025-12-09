"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import api from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useSnap } from "../../hooks/useSnap";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function OrderDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Form state for editing
  const [formData, setFormData] = useState({
    nama: searchParams.get("nama") || "",
    email: searchParams.get("email") || "",
    voucher: searchParams.get("voucher") || "",
    durasi: searchParams.get("durasi") || "1",
  });

  // Initialize form data from URL params
  useEffect(() => {
    setFormData({
      nama: searchParams.get("nama") || "",
      email: searchParams.get("email") || "",
      voucher: searchParams.get("voucher") || "",
      durasi: searchParams.get("durasi") || "1",
    });
  }, [searchParams]);

  const name = isEditMode ? formData.nama : (searchParams.get("nama") || "");
  const email = isEditMode ? formData.email : (searchParams.get("email") || "");
  const voucher = isEditMode ? formData.voucher : (searchParams.get("voucher") || "");
  const duration = parseFloat(isEditMode ? formData.durasi : (searchParams.get("durasi") || "1"));
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

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data to original URL params
    setFormData({
      nama: searchParams.get("nama") || "",
      email: searchParams.get("email") || "",
      voucher: searchParams.get("voucher") || "",
      durasi: searchParams.get("durasi") || "1",
    });
  };

  const handleSave = () => {
    // Validate form
    if (!formData.nama.trim()) {
      toast.error("Nama tidak boleh kosong");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email tidak boleh kosong");
      return;
    }
    if (formData.email && !formData.email.includes("@")) {
      toast.error("Email tidak valid");
      return;
    }

    // Update URL params and refresh
    const params = new URLSearchParams({
      ...formData,
      psId: psId || "",
      psName: psName || "",
      psType: psType || "",
    });
    router.push(`/order-detail?${params.toString()}`);
    setIsEditMode(false);
    toast.success("Data berhasil diperbarui");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, durasi: value }));
  };

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
            localStorage.setItem('lastBookingDuration', duration.toString());
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
    <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="font-inter text-blue-purple text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Order Summary
      </h1>

      <div className="mb-2 flex min-h-10 w-10/12 flex-col items-center gap-6 md:gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full max-w-md flex-col md:w-6/12 md:max-w-full">
          <div className="flex w-full flex-col gap-2 text-sm sm:text-base md:text-lg">
            <label className="font-inter font-semibold">Nama</label>
            {isEditMode ? (
              <Input
                type="text"
                id="nama"
                value={formData.nama}
                onChange={handleFormChange}
                className="rounded-md border border-[#D0D5DD] p-2 text-gray-700 focus-visible:ring-[#8271DB]"
                placeholder="Nama"
              />
            ) : (
              <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
                {name || "Nama"}
              </div>
            )}

            <label className="font-inter font-semibold">E-mail</label>
            {isEditMode ? (
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleFormChange}
                className="rounded-md border border-[#D0D5DD] p-2 text-gray-700 focus-visible:ring-[#8271DB]"
                placeholder="example@example.com"
              />
            ) : (
              <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
                {email}
              </div>
            )}

            <label className="font-inter font-semibold">Voucher</label>
            {isEditMode ? (
              <Input
                type="text"
                id="voucher"
                value={formData.voucher}
                onChange={handleFormChange}
                className="rounded-md border border-[#D0D5DD] p-2 text-gray-700 focus-visible:ring-[#8271DB]"
                placeholder="Masukkan Kode Voucher (opsional)"
              />
            ) : (
              <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
                {voucher || "-"}
              </div>
            )}

            <label className="font-inter font-semibold">Durasi</label>
            {isEditMode ? (
              <Select
                value={formData.durasi}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger className="w-full rounded-md border border-[#D0D5DD] focus:ring-[#8271DB]">
                  <SelectValue placeholder="Pilih durasi" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1">1 Jam</SelectItem>
                  <SelectItem value="2">2 Jam</SelectItem>
                  <SelectItem value="3">3 Jam</SelectItem>
                  <SelectItem value="4">4 Jam</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
                {duration < 0.5 ? "1 Menit (Testing)" : `${duration} Jam`}
              </div>
            )}

            <label className="font-inter font-semibold">PlayStation</label>
            <div className="rounded-md border border-[#D0D5DD] p-2 text-gray-700">
              {psName}
            </div>
          </div>
          
          <div className="w-full flex justify-end items-end gap-3 mt-4 md:mt-8">
            {isEditMode ? (
              <>
                <button
                  onClick={handleCancel}
                  className="w-fit flex items-center justify-center font-bold border hover:cursor-pointer hover:bg-gray-100 border-gray-400 text-gray-700 font-inter text-base sm:text-lg md:text-[20px] rounded-[15px] py-2 px-4 sm:py-[12px] sm:px-[20px] md:px-[30px] text-center transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="w-fit flex items-center justify-center font-bold border hover:cursor-pointer hover:bg-[#8271DB]/20 bg-[#8271DB]/10 border-[#8271DB] text-[#8271DB] font-inter text-base sm:text-lg md:text-[20px] rounded-[15px] py-2 px-4 sm:py-[12px] sm:px-[20px] md:px-[30px] text-center transition-colors"
                >
                  Simpan
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="w-fit flex items-center justify-center font-bold border hover:cursor-pointer hover:bg-[#8271DB]/10 border-[#8271DB] text-[#8271DB] font-inter text-base sm:text-lg md:text-[20px] rounded-[15px] py-2 px-4 sm:py-[12px] sm:px-[20px] md:px-[30px] text-center transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col md:w-6/12 md:max-w-full">
          <div className="text-inter border-blue-purple rounded-xl border p-4 sm:p-5 md:p-8 lg:p-10 text-sm sm:text-base md:text-lg">
            <div className="mb-2 flex w-full justify-between text-xs sm:text-sm md:text-base">
              <p>Date</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>

            <div className="mb-5 flex w-full justify-between text-xs sm:text-sm md:text-base">
              <p>Time</p>
              <p>{new Date().toLocaleTimeString()}</p>
            </div>

            <div className="mb-2 flex w-full justify-between font-bold text-xs sm:text-sm md:text-base">
              <p>Produk</p>
              <p>Qty</p>
            </div>

            <div className="mb-5 flex w-full justify-between text-xs sm:text-sm md:text-base">
              <p className="break-words pr-2">Rental PS ({duration < 0.5 ? "1 Menit (Testing)" : `${duration} Jam`})</p>
              <p className="shrink-0">1x</p>
            </div>

            <div className="mb-2 flex w-full justify-between text-xs sm:text-sm md:text-base">
              <p>Kode Voucher</p>
            </div>

            <Coupon status={voucherStatus} />

            <div className="mb-2 flex w-full justify-between text-xs sm:text-sm md:text-base">
              <p>Subtotal</p>
              <p>Rp {subtotal.toLocaleString()}</p>
            </div>
            <div className="mb-5 flex w-full justify-between text-xs sm:text-sm md:text-base">
              <p>Subtotal Voucher</p>
              <p>- Rp {discount.toLocaleString()}</p>
            </div>

            <div className="mb-5 flex w-full justify-between font-bold text-sm sm:text-base md:text-lg">
              <p>Total</p>
              <p>Rp {total.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-12 md:mb-24 flex justify-center">
            <button
              onClick={handlePayment}
              disabled={loading || isEditMode}
              className="bg-lavender font-inter mt-6 md:mt-10 rounded-lg px-8 sm:px-12 md:px-16 py-2 text-base sm:text-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
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
      className={`mb-6 sm:mb-8 md:mb-10 flex justify-end rounded-md border p-2 ${colormap[status]}`}
    >
      <p className="font-fira-code text-xs sm:text-sm md:text-base lg:text-lg">
        {status == "valid"
          ? "COUPON APPLIED"
          : status == "invalid"
            ? "COUPON INVALID"
            : "NO COUPON INSERTED"}
      </p>
    </div>
  );
}

