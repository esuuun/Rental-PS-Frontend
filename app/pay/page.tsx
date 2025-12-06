"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

function PersonalDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const psId = searchParams.get("psId");
  const psName = searchParams.get("psName");
  const psType = searchParams.get("psType");

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    voucher: "",
    durasi: "1",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, durasi: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.voucher) {
        try {
          const response = await api.get("/promo-codes/validate", {
            params: { code: formData.voucher },
          });

          if (!response.data.valid) {
            toast.error("Kode voucher tidak valid atau sudah kadaluarsa.");
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Error validating voucher:", error);
          toast.error(
            "Gagal memvalidasi voucher. Silakan coba lagi atau kosongkan jika tidak ingin menggunakan voucher.",
          );
          setLoading(false);
          return;
        }
      }

      const params = new URLSearchParams({
        ...formData,
        psId: psId || "",
        psName: psName || "",
        psType: psType || "",
      });
      router.push(`/order-detail?${params.toString()}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Main Content Container */}
      <main className="flex flex-grow flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h2 className="mb-10 text-center text-3xl font-bold text-[#4B32CE]">
            Personal Details
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nama Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="nama" className="font-bold text-gray-700">
                Nama
              </Label>
              <Input
                type="text"
                id="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                placeholder="Lorem ipsum"
                className="focus-visible:ring-[#4B32CE]"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="font-bold text-gray-700">
                E-mail
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@example.com"
                className="focus-visible:ring-[#4B32CE]"
              />
            </div>

            {/* Voucher Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="voucher" className="font-bold text-gray-700">
                Voucher (if applicable)
              </Label>
              <Input
                type="text"
                id="voucher"
                value={formData.voucher}
                onChange={handleChange}
                placeholder="Lorem Ipsum"
                className="focus-visible:ring-[#4B32CE]"
              />
            </div>

            {/* Durasi Dropdown */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="durasi" className="font-bold text-gray-700">
                Durasi (Jam)
              </Label>
              <Select
                value={formData.durasi}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger className="w-full focus:ring-[#4B32CE]">
                  <SelectValue placeholder="Pilih durasi" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="0.017">1 Menit (Testing)</SelectItem>
                  <SelectItem value="1">1 Jam</SelectItem>
                  <SelectItem value="2">2 Jam</SelectItem>
                  <SelectItem value="3">3 Jam</SelectItem>
                  <SelectItem value="4">4 Jam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="rounded-xl border-[#4B32CE] text-[#4B32CE] hover:bg-[#4B32CE]/10 hover:text-[#4B32CE]"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#4B32CE] text-white hover:bg-[#3a26a8] disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Lanjut ke Pembayaran"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function PersonalDetailsForm({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PersonalDetailsContent />
    </Suspense>
  );
}

export default PersonalDetailsForm;
