"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FeDwi2Props {
  location?: string;
}

const FeDwi2 = ({ location }: FeDwi2Props) => {
  const router = useRouter();

  const handleSelectType = (type: "PS4" | "PS5") => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    router.push(`/choose/${type}?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-6 pt-10 pb-10">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#4c3fcf] md:text-4xl">
          Choose your PlayStation
        </h2>

        <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
          {/* PS4 Card */}
          <div
            onClick={() => handleSelectType("PS4")}
            className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/frame ps4.png"
              alt="PS4"
              width={320}
              height={320}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* PS5 Card */}
          <div
            className="group relative cursor-not-allowed overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/frame ps5.png"
              alt="PS5"
              width={320}
              height={320}
              className="h-auto w-full object-cover blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-white/30">
              <h2 className="text-center text-3xl font-bold text-[#000080] md:text-4xl">
                Coming
                <br />
                Soon!
              </h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeDwi2;
