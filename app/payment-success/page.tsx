"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Inter } from "next/font/google";
import { CheckCircle, Loader2 } from "lucide-react";
import api from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";
import DurationCounter from "../../components/DurationCounter";

const inter = Inter({ subsets: ["latin"] });

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get bookingId from URL params or localStorage
    const urlBookingId = searchParams.get("bookingId");
    const storedBookingId = localStorage.getItem("lastBookingId");

    const id = urlBookingId
      ? parseInt(urlBookingId)
      : storedBookingId
        ? parseInt(storedBookingId)
        : null;

    if (!id || isNaN(id)) {
      setError("Booking ID not found");
      setLoading(false);
      return;
    }

    setBookingId(id);
    activateBooking(id);
  }, [searchParams]);

  const activateBooking = async (id: number) => {
    setActivating(true);
    try {
      // Get actual duration from localStorage (for testing 1 minute)
      const storedDuration = localStorage.getItem('lastBookingDuration');
      const durationHours = storedDuration ? parseFloat(storedDuration) : null;
      
      // If duration is less than 0.5 hours (1 minute = 0.017), send test duration
      const testDuration = durationHours && durationHours < 0.5 
        ? Math.round(durationHours * 60 * 60) // Convert to seconds
        : null;
      
      const requestBody = testDuration ? { testDuration } : {};
      const response = await api.post(`/bookings/${id}/activate`, requestBody);
      
      if (response.data.success) {
        setActivated(true);
        toast.success("PlayStation berhasil diaktifkan!");
        
        // Clear localStorage after successful activation
        localStorage.removeItem("lastBookingId");
      } else {
        throw new Error(response.data.error || "Failed to activate");
      }
    } catch (err: any) {
      console.error("Error activating booking:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Gagal mengaktifkan PlayStation";
      
      setError(errorMessage);
      toast.error(errorMessage);
      
      // If it's a warning (ESP32 offline but booking still activated)
      if (err.response?.data?.warning) {
        setActivated(true);
        toast.error(err.response.data.warning, { duration: 5000 });
      }
    } finally {
      setActivating(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#4B32CE]" />
          <p className="text-gray-600">Memproses aktivasi...</p>
        </div>
      </div>
    );
  }

  if (error && !activated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
          <div className="relative flex h-[120px] w-full items-center justify-center sm:h-[180px] md:h-[220px]">
            <div className="absolute inset-0 top-1/2 mx-auto h-18 w-10/12 max-w-160 -translate-y-1/2 rounded-xl bg-red-100 sm:h-23 md:h-28" />
            <div className="z-10 rounded-full bg-red-500 p-4 shadow-lg">
              <CheckCircle className="h-[60px] w-[60px] text-white sm:h-[100px] sm:w-[100px]" />
            </div>
          </div>

          <h1
            className={`w-65 px-4 text-center text-2xl leading-tight font-bold text-red-600 sm:w-full sm:text-3xl md:text-5xl ${inter.className}`}
          >
            Terjadi Kesalahan
          </h1>

          <p className="max-w-md text-center text-gray-600">{error}</p>

          <div className="flex gap-4">
            <Link href="/">
              <button className="touch-manipulation rounded-xl bg-[#4B32CE] px-8 py-2 text-sm font-bold text-white transition-colors hover:bg-[#3a26a8] sm:px-9 sm:py-3">
                Kembali ke Beranda
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
        <div className="relative flex h-[120px] w-full items-center justify-center sm:h-[180px] md:h-[220px]">
          <div className="absolute inset-0 top-1/2 mx-auto h-18 w-10/12 max-w-160 -translate-y-1/2 rounded-xl bg-green-100 sm:h-23 md:h-28" />
          <div className="z-10 rounded-full bg-green-500 p-4 shadow-lg">
            <CheckCircle className="h-[60px] w-[60px] text-white sm:h-[100px] sm:w-[100px]" />
          </div>
        </div>

        <h1
          className={`w-65 px-4 text-center text-2xl leading-tight font-bold text-green-600 sm:w-full sm:text-3xl md:text-5xl ${inter.className}`}
        >
          Pembayaran Berhasil!
        </h1>

        <p className="max-w-md text-center text-gray-600">
          {activated
            ? "PlayStation Anda telah diaktifkan. Selamat bermain!"
            : "Terima kasih telah melakukan pembayaran. Pesanan Anda sedang diproses."}
        </p>

        {activated && bookingId && (
          <div className="w-full max-w-md">
            <DurationCounter bookingId={bookingId} />
          </div>
        )}

        <Link href="/">
          <button className="touch-manipulation rounded-xl bg-[#4B32CE] px-8 py-2 text-sm font-bold text-white transition-colors hover:bg-[#3a26a8] sm:px-9 sm:py-3">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#4B32CE]" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
