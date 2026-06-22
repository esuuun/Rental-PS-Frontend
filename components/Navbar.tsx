"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Gamepad2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Pricelist", id: "pricelist", href: "/#pricelist" },
    { name: "How It Works", id: "how-it-works", href: "/#how-it-works" },
    { name: "About Us", id: "about-us", href: "/#about-us" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-[#4B32CE]/95 shadow-lg backdrop-blur-md py-3"
          : "bg-[#4B32CE] py-4"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Left Side: Back button & Logo */}
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center rounded-full p-1.5 text-white transition-colors hover:bg-white/20"
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {isHomePage ? (
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "booking-hero")}
              className="flex items-center gap-2 font-inter text-xl font-extrabold tracking-tight text-white transition-transform hover:scale-[1.02]"
            >
              <div className="rounded-md bg-white p-1 text-[#4B32CE]">
                <Gamepad2 size={18} />
              </div>
              <span>Funbox<span className="text-purple-200">.idn</span></span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 font-inter text-xl font-extrabold tracking-tight text-white">
              <div className="rounded-md bg-white p-1 text-[#4B32CE]">
                <Gamepad2 size={18} />
              </div>
              <span>Funbox<span className="text-purple-200">.idn</span></span>
            </div>
          )}
        </div>

        {/* Center: Desktop Links */}
        {isHomePage && (
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-medium text-purple-100 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Right Side: CTA Button */}
        {isHomePage && (
          <div className="hidden md:block">
            <Link
              href="#booking-hero"
              onClick={(e) => handleNavClick(e, "booking-hero")}
              className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-[#4B32CE] shadow-md transition-all hover:bg-purple-50 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Book Session
            </Link>
          </div>
        )}

        {/* Mobile menu toggle */}
        {isHomePage && (
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-1.5 text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isHomePage && (
        <div
          className={`absolute top-full left-0 w-full bg-[#4B32CE] border-t border-white/10 shadow-xl transition-all duration-300 md:hidden ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
            }`}
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="border-b border-white/5 pb-2 text-base font-semibold text-purple-100 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#booking-hero"
              onClick={(e) => handleNavClick(e, "booking-hero")}
              className="mt-2 w-full rounded-xl bg-white py-3 text-center text-base font-bold text-[#4B32CE] shadow-md"
            >
              Book Session
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
