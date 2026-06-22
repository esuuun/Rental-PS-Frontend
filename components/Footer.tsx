"use client";

import React from "react";
import Link from "next/link";
import { Gamepad2, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#0d0a21] text-gray-300">
      {/* Decorative top border with gradient */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#4B32CE] to-transparent"></div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#4B32CE] p-2 text-white shadow-lg shadow-[#4B32CE]/30">
                <Gamepad2 size={24} className="animate-pulse" />
              </div>
              <span className="font-inter text-2xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text">
                Funbox<span className="text-[#8271db]">.idn</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400 font-sans">
              Experience next-gen and classic gaming at your favorite hangout spots. Portable console rentals made simple, fast, and accessible for everyone.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#1b1736] p-2.5 text-gray-400 transition-all duration-300 hover:bg-[#4B32CE] hover:text-white hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:contact@funboxidn.com"
                className="rounded-full bg-[#1b1736] p-2.5 text-gray-400 transition-all duration-300 hover:bg-[#4B32CE] hover:text-white hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button
                  onClick={() => scrollToSection("booking-hero")}
                  className="cursor-pointer transition-colors duration-200 hover:text-white hover:underline"
                >
                  Book Lounge
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="cursor-pointer transition-colors duration-200 hover:text-white hover:underline"
                >
                  How It Works
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("about-us")}
                  className="cursor-pointer transition-colors duration-200 hover:text-white hover:underline"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Our Venues
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#8271db]" />
                <div>
                  <span className="font-semibold text-white">Tens Coffee UPN VJ</span>
                  <p className="text-xs text-gray-500">Jakarta Selatan, Indonesia</p>
                </div>
              </li>
              <li className="flex items-start gap-2 border-t border-white/5 pt-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-600" />
                <div>
                  <span className="text-gray-500 font-semibold">More Locations</span>
                  <p className="text-xs text-gray-600">Coming soon to your favorite spots</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Funbox.idn. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 text-xs text-gray-500 md:mt-0">
            <span className="transition-colors hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="transition-colors hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
