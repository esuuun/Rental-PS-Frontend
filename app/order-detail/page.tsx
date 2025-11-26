"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useState, useEffect, Suspense } from "react";
import api from "../../lib/api";

declare global {
  interface Window {
    snap: any;
  }
}

function OrderDetailContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const voucher = searchParams.get("voucher") || "";
  const duration = parseInt(searchParams.get("durasi") || "1");
  const psId = searchParams.get("psId");
  const psName = searchParams.get("psName");
  const psType = searchParams.get("psType") || "PS4";

  // Pricing based on PS Type (per hour = 2 slots)
  // PS4: 25k/slot -> 50k/hour
  // PS5: 30k/slot -> 60k/hour
  const pricePerHour = psType.toUpperCase().includes("PS5") ? 60000 : 50000;
  const subtotal = pricePerHour * duration;
  const discount = 0; // Implement voucher logic if needed
  const total = subtotal - discount;

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!psId) {
      alert("Invalid order details");
      return;
    }

    setLoading(true);
    try {
      // 1. Create Booking
      // waktuMulai must be in the future. Adding 1 minute buffer.
      const startTime = new Date(Date.now() + 60 * 1000).toISOString();

      const bookingResponse = await api.post("/bookings", {
        namaPanggilan: name,
        email: email,
        playstationId: parseInt(psId),
        waktuMulai: startTime,
        jumlahSlot: duration * 2, // 30 min slots
        kodePromo: voucher || undefined,
      });

      const booking = bookingResponse.data.booking;
      const bookingId = booking.id;

      // 2. Initiate Payment
      const paymentResponse = await api.post("/payments/create", {
        bookingId: bookingId,
      });

      const snapToken = paymentResponse.data.payment.snapToken;

      // 3. Open Snap
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function (result: any) {
            alert("Payment success!");
            console.log(result);
            // Redirect to success page or update UI
            // router.push("/payment-success"); // You might want to add this
          },
          onPending: function (result: any) {
            alert("Waiting for your payment!");
            console.log(result);
          },
          onError: function (result: any) {
            alert("Payment failed!");
            console.log(result);
          },
          onClose: function () {
            alert("You closed the popup without finishing the payment");
          },
        });
      } else {
        alert("Payment gateway not loaded properly. Please refresh.");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to process payment.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  let status: couponStatus = voucher ? "valid" : "unused"; // Simplified logic

  return (
    <div className="flex flex-col items-center gap-10">
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""}
      />

      <nav className="bg-blue-purple flex w-full items-center px-10 py-3">
        <a className="font-inter text-2xl font-bold text-white" href="#">
          Funbox.idn
        </a>
      </nav>

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
              {duration} Jam
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
              <p>Rental PS ({duration} Jam)</p>
              <p>1x</p>
            </div>

            <div className="mb-2 flex w-full justify-between">
              <p>Kode Voucher</p>
            </div>

            <Coupon status={status} />

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
