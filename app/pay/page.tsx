import React from 'react';

type Props = {};

function PersonalDetailsForm({}: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header Section */}
      <header className="w-full bg-purple-700 py-4 px-6 shadow-md">
        <h1 className="text-white text-xl font-bold">Funbox.idn</h1>
      </header>

      {/* Main Content Container */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">
            Personal Details
          </h2>

          {/* Form */}
          <form className="space-y-6">
            
            {/* Nama Input */}
            <div className="flex flex-col">
              <label htmlFor="nama" className="font-bold text-gray-700 mb-2">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                placeholder="Lorem ipsum"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-300"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-300"
              />
            </div>

            {/* Voucher Input */}
            <div className="flex flex-col">
              <label htmlFor="voucher" className="font-bold text-gray-700 mb-2">
                Voucher (if applicable)
              </label>
              <input
                type="text"
                id="voucher"
                placeholder="Lorem Ipsum"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-300"
              />
            </div>

            {/* Durasi Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="durasi" className="font-bold text-gray-700 mb-2">
                Durasi
              </label>
              <div className="relative">
                <select
                  id="durasi"
                  defaultValue=""
                  className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-500 bg-white"
                >
                  <option value="" disabled>Pilih Satu</option>
                  <option value="1">1 Bulan</option>
                  <option value="3">3 Bulan</option>
                  <option value="12">12 Bulan</option>
                </select>
                {/* Custom Chevron Icon for Select */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-4 mt-8 pt-4">
              <button
                type="button"
                className="px-8 py-2 border border-purple-200 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-700 transition-colors"
              >
                Lanjut ke Pembayaran
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default PersonalDetailsForm;