'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FeDwi1 = () => {
  const [selectedPlace, setSelectedPlace] = useState('');

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header */}
      <header className="bg-[#5b4aff] px-6 py-4 shadow-md">
        <h1 className="text-white text-xl font-bold tracking-wide">Funbox.idn</h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-8 pb-10 max-w-md mx-auto w-full">
        
        {/* Banner Card PLACEHOLDER*/}

        <div className="w-full h-48 bg-[#1a1464] rounded-2xl overflow-hidden relative shadow-lg mb-6 group">
          <div className="absolute inset-0 flex flex-col items-center justify-center transform -rotate-12 scale-125 opacity-90 select-none pointer-events-none">
            <div className="whitespace-nowrap text-6xl font-bold text-white/90 leading-tight">Funbox.idn Fun</div>
            <div className="whitespace-nowrap text-6xl font-bold text-white/90 leading-tight ml-24">Funbox.idn</div>
            <div className="whitespace-nowrap text-6xl font-bold text-white/90 leading-tight">Funbox.idn Fun</div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent"></div>
        </div>

        {/* Pagination Dots PLACEHOLDER*/}
        <div className="flex gap-2 mb-10">
          <div className="w-3 h-3 rounded-full bg-[#5b4aff]"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>

        {/* Welcome Message */}
        <div className="flex items-center flex-wrap justify-center gap-2 mb-10">
          <span className="text-4xl font-bold text-[#4c3fcf]">Welcome,</span>
          <div className="bg-[#4c3fcf] text-white px-4 py-1 rounded-xl transform -skew-x-6">
            <span className="text-4xl font-bold inline-block transform skew-x-6 font-mono">Player!</span>
          </div>
        </div>

        {/* Dropdown Input PLACEHOLDER HARDCODED*/}
        <div className="w-full mb-12 relative">
          <div className="relative">
            <select 
              className="w-full p-4 pr-10 bg-white border border-indigo-200 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5b4aff] focus:border-transparent appearance-none cursor-pointer shadow-sm text-sm"
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
            >
              <option value="" disabled hidden>Pilih tempat</option>
              <option value="jakarta">Jakarta</option>
              <option value="bandung">Bandung</option>
              <option value="surabaya">Surabaya</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-40 bg-[#7c6bf6] hover:bg-[#6a5ae0] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors duration-200 ease-in-out">
          Lanjut
        </button>

      </main>
    </div>
  );
};

export default function App() {
  return <FeDwi1 />;
}