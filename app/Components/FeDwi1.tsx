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

interface FeDwi1Props {
  onLocationSelect: (location: string) => void;
}

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

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* Header */}
      <header className="bg-[#4B32CE] px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold tracking-wide text-white">
          Funbox.idn
        </h1>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-6 pt-8 pb-10">
        {/* Banner Card PLACEHOLDER*/}

        <div className="group relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-[#1a1464] shadow-lg">
          <div className="pointer-events-none absolute inset-0 flex scale-125 -rotate-12 transform flex-col items-center justify-center opacity-90 select-none">
            <div className="text-6xl leading-tight font-bold whitespace-nowrap text-white/90">
              Funbox.idn Fun
            </div>
            <div className="ml-24 text-6xl leading-tight font-bold whitespace-nowrap text-white/90">
              Funbox.idn
            </div>
            <div className="text-6xl leading-tight font-bold whitespace-nowrap text-white/90">
              Funbox.idn Fun
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent"></div>
        </div>

        {/* Pagination Dots PLACEHOLDER*/}
        <div className="mb-10 flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#4B32CE]"></div>
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
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
            <SelectTrigger className="h-14 w-full rounded-lg border-indigo-200 text-base shadow-sm focus:ring-[#4B32CE]">
              <SelectValue placeholder="Pilih tempat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jakarta">Jakarta</SelectItem>
              <SelectItem value="bandung">Bandung</SelectItem>
              <SelectItem value="surabaya">Surabaya</SelectItem>
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
