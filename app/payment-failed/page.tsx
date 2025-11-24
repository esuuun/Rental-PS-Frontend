import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function PaymentFailed() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
        <div className="relative w-full h-[120px] sm:h-[180px] md:h-[220px]">
          <div className="absolute inset-0 w-10/12 max-w-160 h-18 sm:h-23 md:h-28 bg-[#2A1B79] rounded-xl mx-auto top-4/5 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <Image
              src="/failed.svg"
              alt="Payment Failed"
              width={100}
              height={100}
              priority
              className="w-[100px] h-[100px] sm:w-[150px] sm:h-auto  md:w-[185px] md:h-[185px]"
            />
          </div>
        </div>

        <h1 className={`text-2xl sm:text-3xl md:text-5xl font-bold text-[#2A1B79] text-center leading-tight px-4 w-65 sm:w-full ${inter.className}`}>
          Uh Oh! Pembayaran Gagal
        </h1>

        <Link href="/">
          <button className="px-8 py-2 sm:py-3 sm:px-9 bg-[#8271DB] hover:bg-[#6A5CA8] active:bg-[#6A5CA8] transition-colors rounded-xl text-white text-sm font-bold touch-manipulation">
            Coba lagi
          </button>
        </Link>
      </div>
    </div>
  );
}
