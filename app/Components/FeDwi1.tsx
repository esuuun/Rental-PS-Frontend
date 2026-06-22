"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Tv,
  Coffee,
  Sparkles,
  Clock,
  CreditCard,
  CheckCircle2,
  Users,
  Flame,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Footer from "@/components/Footer";

interface FeDwi1Props {
  onLocationSelect: (location: string) => void;
}

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-base font-bold text-gray-900 md:text-lg">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#4B32CE]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FeDwi1 = ({ onLocationSelect }: FeDwi1Props) => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const router = useRouter();

  const handleLocationChange = (value: string) => {
    setSelectedPlace(value);
    onLocationSelect(value);
  };

  const handleNext = () => {
    if (selectedPlace) {
      router.push(`/choose?location=${selectedPlace}`);
    }
  };

  // Smooth scroll helper
  const scrollToBooking = () => {
    const element = document.getElementById("booking-hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      {/* 1. HERO SECTION */}
      <section
        id="booking-hero"
        className="relative overflow-hidden bg-gradient-to-br from-[#0c0827] via-[#120c3a] to-[#060414] py-16 text-white md:py-24"
      >
        {/* Glowing Background Elements */}
        <div className="absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4B32CE]/35 blur-[120px] pointer-events-none"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/20 blur-[130px] pointer-events-none"></div>

        {/* Diagonal Tech Grid Lines */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        ></div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

            {/* Left Column: Headline */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#4B32CE]/30 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-purple-300 uppercase border border-purple-500/30">
                <Flame size={14} className="text-[#8271db] animate-pulse" />
                Premium Portable Gaming Lounge
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:leading-tight">
                Play Station <br />
                <span className="bg-gradient-to-r from-[#8271db] via-purple-300 to-white bg-clip-text text-transparent">
                  Anytime, Anywhere.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                No need to own a console to play the latest AAA blockbusters. Funbox brings fully equipped PlayStation 4 & 5 setups directly to your favorite cafes, hangout hubs, and community hubs.
              </p>

              {/* Small Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Licensed AAA Catalog</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tv size={16} className="text-emerald-400" />
                  <span>Low-Latency Pro Monitors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-emerald-400" />
                  <span>Dual Controllers Included</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphism Booking Card */}
            <div className="w-full lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
              >
                {/* Banner Wrapper */}
                <div className="relative mb-6 h-36 w-full overflow-hidden rounded-2xl border border-white/5 shadow-md">
                  <Image
                    src="/banner.png"
                    alt="Banner Funbox"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Welcome & Prompt */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-white">Welcome,</span>
                    <div className="-skew-x-6 transform rounded-lg bg-[#4B32CE] px-3 py-0.5 text-white">
                      <span className="inline-block skew-x-6 transform font-mono text-xl font-black tracking-wider">
                        PLAYER!
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Step 1 of 3</span>
                </div>

                {/* Dropdown Input */}
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Select Lounge Location
                  </label>
                  <Select value={selectedPlace} onValueChange={handleLocationChange}>
                    <SelectTrigger className="h-14 w-full cursor-pointer rounded-xl border-white/10 bg-white/10 text-base text-white shadow-sm placeholder:text-gray-400 focus:ring-[#4B32CE] focus:border-purple-400">
                      <SelectValue placeholder="Select venue..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-white border-white/10">
                      <SelectItem value="Tens-Coffee-UPN-VJ" className="focus:bg-[#4B32CE] focus:text-white cursor-pointer">
                        Tens Coffee UPN VJ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[11px] text-gray-400">
                    Note: You must be present at the venue to unlock and play.
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleNext}
                  className="h-auto w-full rounded-2xl bg-[#4B32CE] py-4 text-base font-extrabold text-white shadow-lg shadow-[#4B32CE]/30 transition-all hover:cursor-pointer hover:bg-[#3a26a8] hover:scale-[1.02] active:scale-95 disabled:bg-white/10 disabled:text-gray-500 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
                  disabled={!selectedPlace}
                >
                  Find Available Consoles
                </Button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="relative -mt-6 z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-xl border border-gray-100 md:gap-8 md:p-8">
          <div className="text-center border-r border-gray-100 last:border-r-0 flex flex-col justify-center items-center px-1">
            <h3 className="text-sm font-extrabold text-[#4B32CE] sm:text-base md:text-2xl">Plug & Play</h3>
            <p className="text-[9px] uppercase font-bold tracking-wider text-gray-500 md:text-xs mt-1">
              Tanpa Setup Tambahan
            </p>
          </div>
          <div className="text-center border-r border-gray-100 last:border-r-0 flex flex-col justify-center items-center px-1">
            <h3 className="text-sm font-extrabold text-[#4B32CE] sm:text-base md:text-2xl">2 Controllers</h3>
            <p className="text-[9px] uppercase font-bold tracking-wider text-gray-500 md:text-xs mt-1">
              Siap Main Bersama Teman
            </p>
          </div>
          <div className="text-center flex flex-col justify-center items-center px-1">
            <h3 className="text-sm font-extrabold text-[#4B32CE] sm:text-base md:text-2xl">HD Screen</h3>
            <p className="text-[9px] uppercase font-bold tracking-wider text-gray-500 md:text-xs mt-1">
              Layar Rendah Latensi
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4B32CE]">
              Getting Started
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Start Gaming in 4 Simple Steps
            </h2>
            <p className="mx-auto max-w-xl text-sm text-gray-500 md:text-base">
              Say goodbye to cable configurations and configurations. Our completely automated system gets you up and running in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
              <span className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-extrabold text-[#4B32CE]">
                1
              </span>
              <div className="mb-6 rounded-2xl bg-[#4B32CE]/10 p-4 text-[#4B32CE]">
                <Coffee size={32} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Choose Location</h3>
              <p className="text-sm text-gray-500">
                Visit our partnered cafe/lounge (e.g. Tens Coffee) and find a Funbox terminal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
              <span className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-extrabold text-[#4B32CE]">
                2
              </span>
              <div className="mb-6 rounded-2xl bg-[#4B32CE]/10 p-4 text-[#4B32CE]">
                <Gamepad2 size={32} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Select Console</h3>
              <p className="text-sm text-gray-500">
                Choose between PS4 or PS5 (Coming Soon), and browse our ready games.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
              <span className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-extrabold text-[#4B32CE]">
                3
              </span>
              <div className="mb-6 rounded-2xl bg-[#4B32CE]/10 p-4 text-[#4B32CE]">
                <CreditCard size={32} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Instant QRIS</h3>
              <p className="text-sm text-gray-500">
                Fill in your details, choose your rental duration, and pay securely via QRIS.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
              <span className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-extrabold text-[#4B32CE]">
                4
              </span>
              <div className="mb-6 rounded-2xl bg-[#4B32CE]/10 p-4 text-[#4B32CE]">
                <Sparkles size={32} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Play Instantly</h3>
              <p className="text-sm text-gray-500">
                The console turns on automatically! Grab the controllers and start playing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICELIST SECTION */}
      <section id="pricelist" className="py-20 md:py-28 bg-slate-75">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4B32CE]">
              Tarif Sewa
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Pricelist Sewa Funbox
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Konsol game portable berbentuk koper yang sudah dilengkapi layar, sehingga bisa langsung dipakai tanpa perlu TV atau monitor tambahan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* 1 Jam Card */}
            <div className="relative flex flex-col justify-between p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full">
                    Sesi Pendek
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">1 Jam</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#4B32CE]">12k</span>
                  <span className="text-gray-500 font-medium text-sm">/ jam</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>Layar Built-in Monitor HD</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>2 Controller Wireless</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>Akses Seluruh Game</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={scrollToBooking}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-[#4B32CE] hover:text-white hover:border-[#4B32CE] transition-all duration-200 hover:cursor-pointer"
              >
                Pesan Sekarang
              </button>
            </div>

            {/* 2 Jam Card */}
            <div className="relative flex flex-col justify-between p-8 bg-white rounded-3xl border-2 border-[#4B32CE] shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#4B32CE] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                Terpopuler
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-[#4B32CE] bg-[#4B32CE]/10 rounded-full">
                    Sesi Ideal
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">2 Jam</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#4B32CE]">20k</span>
                  <span className="text-gray-500 font-medium text-sm">/ 2 jam</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>Layar Built-in Monitor HD</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>2 Controller Wireless</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>Akses Seluruh Game</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span className="font-semibold text-emerald-600">Lebih Hemat 16%</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={scrollToBooking}
                className="w-full py-3 px-4 rounded-xl bg-[#4B32CE] text-sm font-bold text-white shadow-md hover:bg-[#3a26a8] hover:shadow-lg transition-all duration-200 hover:cursor-pointer"
              >
                Pesan Sekarang
              </button>
            </div>

            {/* 3 Jam Card */}
            <div className="relative flex flex-col justify-between p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-100 rounded-full">
                    Paling Hemat
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">3 Jam</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#4B32CE]">30k</span>
                  <span className="text-gray-500 font-medium text-sm">/ 3 jam</span>
                </div>
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>Layar Built-in Monitor HD</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>2 Controller Wireless</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span>Akses Seluruh Game</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#4B32CE] shrink-0" />
                    <span className="font-semibold text-emerald-600">Lebih Hemat 20%</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={scrollToBooking}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-[#4B32CE] hover:text-white hover:border-[#4B32CE] transition-all duration-200 hover:cursor-pointer"
              >
                Pesan Sekarang
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* 5. ABOUT US SECTION */}
      <section id="about-us" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4B32CE]">
                Our Story
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Bridging Cafe Vibe and Gaming Culture
              </h2>
              <p className="text-base leading-relaxed text-gray-600">
                Funbox was born out of a simple observation: gaming is most fun when it is shared with friends, but setting up consoles and meeting at home is not always convenient. On the other hand, visiting a cafe is a great way to socialize, but sometimes we want an active source of entertainment.
              </p>
              <p className="text-base leading-relaxed text-gray-600">
                We designed a custom portable console terminal that sets up seamlessly at partnered venues, creating a high-performance console rental lounge. By collaborating with local businesses like Tens Coffee, we provide a brand new way to hang out, compete, and connect.
              </p>

              <div className="pt-4">
                <button
                  onClick={scrollToBooking}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4B32CE] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:cursor-pointer hover:bg-[#3a26a8] hover:scale-105 active:scale-95"
                >
                  <Gamepad2 size={16} />
                  Book Your Console Now
                </button>
              </div>
            </div>

            {/* Decorative Visual Card */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#4B32CE]/10 rounded-3xl rotate-3 scale-95 pointer-events-none"></div>
              <div className="relative w-full overflow-hidden rounded-3xl border border-gray-100 bg-[#0d0a21] p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-sm tracking-widest text-[#8271db]">
                    FUNBOX_TERMINAL_CONFIG
                  </span>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                </div>

                <ul className="space-y-4 text-sm md:text-base">
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-[#8271db]">Console:</span>
                    <span className="text-gray-300">Sony PlayStation (PS4 Pro / Slim Edition)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-[#8271db]">Display:</span>
                    <span className="text-gray-300">24-inch Low-Latency Full HD Monitor</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-[#8271db]">Controls:</span>
                    <span className="text-gray-300">2x DualShock Wireless Controllers (charged)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-[#8271db]">Audio:</span>
                    <span className="text-gray-300">Clear Stereo Speaker Out</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-[#8271db]">Connection:</span>
                    <span className="text-gray-300">Automated Smart Activation Relays</span>
                  </li>
                </ul>

                <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/5">
                  <Coffee className="text-[#8271db] shrink-0" size={24} />
                  <p className="text-xs leading-relaxed text-gray-400">
                    Perfect companion at Tens Coffee: Enjoy a fresh cup of iced coffee and a warm plate of fries while taking on your friends in a football match!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
};

export default FeDwi1;
