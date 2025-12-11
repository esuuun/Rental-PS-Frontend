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
      <main className="mx-auto flex w-full flex-1 flex-col items-center px-6 pt-8 pb-10">
        {/* Banner */}
        <div className="relative mb-10 h-32 w-full overflow-hidden rounded-2xl shadow-lg md:h-48 md:w-4xl">
          <Image
            src="/banner.png"
            alt="Banner Funbox"
            fill
            className="object-fill"
            priority
          />
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
        <div className="relative mb-12 w-full max-w-lg">
          <Select value={selectedPlace} onValueChange={handleLocationChange}>
            <SelectTrigger className="h-14 w-full cursor-pointer rounded-lg border-indigo-200 bg-white text-base shadow-sm focus:ring-[#4B32CE]">
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
          className="h-auto w-40 rounded-xl bg-[#4B32CE] px-8 py-3 text-base font-bold text-white shadow-md hover:cursor-pointer hover:bg-[#3a26a8]"
          disabled={!selectedPlace}
        >
          Lanjut
        </Button>
      </main>
    </div>
  );
};

export default FeDwi1;
