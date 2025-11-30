"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  return (
    <nav className="bg-blue-purple sticky top-0 z-50 flex w-full items-center gap-4 px-6 py-4 shadow-md">
      {!isHomePage && (
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-full p-1 text-white transition-colors hover:bg-white/20"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <Link
        href="/"
        className="font-inter text-xl font-bold tracking-wide text-white"
      >
        Funbox.idn
      </Link>
    </nav>
  );
}
