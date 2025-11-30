import Link from "next/link";
import { Inter } from "next/font/google";
import { CheckCircle } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
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
          Terima kasih telah melakukan pembayaran. Pesanan Anda sedang diproses.
        </p>

        <Link href="/">
          <button className="touch-manipulation rounded-xl bg-[#4B32CE] px-8 py-2 text-sm font-bold text-white transition-colors hover:bg-[#3a26a8] sm:px-9 sm:py-3">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}
