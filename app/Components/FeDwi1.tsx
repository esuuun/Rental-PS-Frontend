"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface FeDwi1Props {
  onLocationSelect: (location: string) => void;
}

const banners = [
  {
    id: 1,
    bg: "bg-[#1a1464]",
    text: "Funbox.idn",
  },
  {
    id: 2,
    bg: "bg-[#4B32CE]",
    text: "PlayStation 5",
  },
  {
    id: 3,
    bg: "bg-[#8271db]",
    text: "Promo Spesial",
  },
];

const FeDwi1 = ({ onLocationSelect }: FeDwi1Props) => {
  const [selectedPlace, setSelectedPlace] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationChange = (value: string) => {
    setSelectedPlace(value);
    onLocationSelect(value);
  };

  const handleNext = () => {
    if (selectedPlace) {
      router.push(`/choose?location=${selectedPlace}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-6 pt-8 pb-10">
        {/* Banner Carousel */}
        <div className="group relative mb-6 h-48 w-full overflow-hidden rounded-2xl shadow-lg">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } ${banner.bg}`}
            >
              <div className="pointer-events-none absolute inset-0 flex scale-125 -rotate-12 transform flex-col items-center justify-center opacity-90 select-none">
                <div className="text-6xl leading-tight font-bold whitespace-nowrap text-white/90">
                  {banner.text} Fun
                </div>
                <div className="ml-24 text-6xl leading-tight font-bold whitespace-nowrap text-white/90">
                  {banner.text}
                </div>
                <div className="text-6xl leading-tight font-bold whitespace-nowrap text-white/90">
                  {banner.text} Fun
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mb-10 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-[#4B32CE]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Welcome Message */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <span className="text-4xl font-bold text-[#4B32CE]">Welcome,</span>
          <div className="-skew-x-6 transform rounded-xl bg-[#4B32CE] px-4 py-1 text-white">
            <span className="inline-block skew-x-6 transform font-mono text-4xl font-bold">
              Player!
            </span>
          </div>
        </div>

        {/* Dropdown Input */}
        <div className="relative mb-12 w-full">
          <Select value={selectedPlace} onValueChange={handleLocationChange}>
            <SelectTrigger className="h-14 w-full rounded-lg border-indigo-200 bg-white text-base shadow-sm focus:ring-[#4B32CE]">
              <SelectValue placeholder="Pilih tempat" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Tens-Coffee-UPN-VJ">
                Tens Coffee UPN VJ
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleNext}
          className="h-auto w-40 rounded-xl bg-[#4B32CE] px-8 py-3 text-base font-bold text-white shadow-md hover:bg-[#3a26a8]"
          disabled={!selectedPlace}
        >
          Lanjut
        </Button>
      </main>
    </div>
  );
};

export default FeDwi1;
