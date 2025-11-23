'use client';

import React from 'react';

const FeDwi2 = () => {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header */}
      <header className="bg-[#5b4aff] px-6 py-4 shadow-md sticky top-0 z-10">
        <h1 className="text-white text-xl font-bold tracking-wide">Funbox.idn</h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-10 pb-10 w-full max-w-4xl mx-auto">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#4c3fcf] mb-10 text-center">
          Choose your PlayStation
        </h2>

        {/* Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center md:items-stretch">
          
          {/* PS4 Card PLACEHOLDER */}
          <div className="relative w-full max-w-xs md:max-w-sm aspect-square bg-gradient-to-br from-[#4b39ef] to-[#3025b0] rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer group">
            {/* Decorative Background Elements PLACEHOLDER */}
            <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#facc15] rounded-full opacity-90"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-[#7c6bf6] rounded-full opacity-50 mix-blend-overlay"></div>
            
            {/* Geometric Icons PLACEHOLDER */}
            <div className="absolute top-12 left-8 border-[3px] border-[#ff5f5f] w-8 h-8 transform rotate-12 opacity-80" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div> {/* Triangle */}
            <div className="absolute top-24 right-12 border-[3px] border-white w-8 h-8 rounded-sm opacity-60"></div> {/* Square */}
            <div className="absolute bottom-20 right-20 text-[#4c3fcf] font-bold text-xl opacity-20 transform rotate-45">+</div> {/* Cross */}

            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
              <span className="text-7xl font-bold text-white tracking-tighter drop-shadow-lg">PS4</span>
              <div className="mt-2 text-white/80 font-medium text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Select Console</div>
            </div>
          </div>

          {/* PS5 Card Placeholder PLACEHOLDER */}
          <div className="relative w-full max-w-xs md:max-w-sm aspect-square bg-gradient-to-br from-[#ef4444] to-[#c72e2e] rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer group">
             {/* Decorative Background Elements PLACEHOLDER */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#facc15] rounded-full opacity-90"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf6] rounded-full opacity-60 mix-blend-multiply"></div>

             {/* Geometric Icons PLACEHOLDER */}
            <div className="absolute top-20 right-10 border-[3px] border-white w-8 h-8 transform -rotate-12 opacity-80" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div> {/* Triangle */}
            <div className="absolute bottom-24 left-12 text-white font-bold text-4xl opacity-40 transform rotate-12">×</div> {/* Cross */}
            <div className="absolute top-32 left-1/2 border-[3px] border-white w-6 h-6 rounded-full opacity-30"></div> {/* Circle */}

            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
              <span className="text-7xl font-bold text-white tracking-tighter drop-shadow-lg">PS5</span>
              <div className="mt-2 text-white/80 font-medium text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Select Console</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default function App() {
  return <FeDwi2 />;
}