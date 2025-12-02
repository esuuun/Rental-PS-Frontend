"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import ErrorModal from "../../components/ErrorModal";

interface PlayStation {
  id: number;
  nama: string;
  tipe: string;
  lokasi: string;
  status: "AVAILABLE" | "MAINTENANCE" | "OFFLINE" | "IN_USE";
  macAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ChoosePSPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const psType = params.ps as string; // "PS4" or "PS5"

  const [playstations, setPlaystations] = useState<PlayStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlayStations = async () => {
      setLoading(true);
      try {
        // Real API call
        const response = await api.get("/playstations/availability", {
          params: {
            tipe: psType.toUpperCase(),
            lokasi: location,
          },
        });

        if (response.data.playStations.length > 0) {
          setPlaystations(response.data.playStations);
        } else {
          setPlaystations([]);
        }
      } catch (error) {
        console.error("Error fetching playstations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (psType) {
      fetchPlayStations();
    }
  }, [location, psType]);

  const handleSelectPS = (ps: PlayStation) => {
    if (ps.status !== "AVAILABLE") {
      setIsErrorModalOpen(true);
      return;
    }

    router.push(
      `/pay?psId=${ps.id}&psName=${encodeURIComponent(ps.nama)}&psType=${encodeURIComponent(ps.tipe)}`,
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-[#4ade80]"; // Green
      case "MAINTENANCE":
      case "IN_USE":
        return "bg-[#ef4444]"; // Red
      case "OFFLINE":
        return "bg-[#4f46e5]"; // Blue/Indigo
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "Available";
      case "IN_USE":
        return "In Use";
      case "MAINTENANCE":
        return "Maintenance";
      case "OFFLINE":
        return "Offline";
      default:
        // Fallback: Replace underscores with spaces and capitalize each word
        return status
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  // Mock data for UI testing if API returns empty (since API might only return available ones)
  // Remove this in production if API supports all statuses
  const displayPlaystations =
    playstations.length > 0
      ? playstations
      : [
          // Fallback mock data to match the UI request if no data found
          // { id: 1, nama: "PS-01", tipe: psType, lokasi: "Kutek", status: "AVAILABLE" },
          // { id: 2, nama: "PS-02", tipe: psType, lokasi: "Kutek", status: "AVAILABLE" },
          // { id: 3, nama: "PS-03", tipe: psType, lokasi: "Kutek", status: "MAINTENANCE" }, // In Use
          // { id: 4, nama: "PS-04", tipe: psType, lokasi: "Kutek", status: "MAINTENANCE" }, // In Use
          // { id: 5, nama: "PS-05", tipe: psType, lokasi: "Kutek", status: "OFFLINE" },
          // { id: 6, nama: "PS-06", tipe: psType, lokasi: "Kutek", status: "OFFLINE" },
        ];

  // Skeleton Component
  const SkeletonCard = () => (
    <div className="relative flex h-48 w-full animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
      <div className="w-1/3 bg-gray-200"></div>
      <div className="flex flex-1 flex-col justify-center space-y-4 px-6 py-4">
        <div className="h-8 w-32 rounded-full bg-gray-200"></div>
        <div className="h-6 w-48 rounded bg-gray-200"></div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 pt-10 pb-10">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#4c3fcf] md:text-4xl">
          Choose your PlayStation
        </h2>
        <p className="mb-10 text-center text-sm text-[#4c3fcf]">
          🔔 Untuk PS yang offline, anda dapat menyalakan PS terlebih dahulu
        </p>

        {loading ? (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {playstations.map((ps) => (
              <div
                key={ps.id}
                onClick={() => handleSelectPS(ps)}
                className="relative flex h-48 w-full cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-transform hover:scale-105"
              >
                {/* Colored Triangle Background */}
                <div
                  className={`absolute top-0 left-0 h-32 w-32 ${getStatusColor(ps.status)}`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                ></div>

                {/* Left Side - Image */}
                <div className="relative z-10 flex w-1/3 items-center justify-center p-2">
                  <Image
                    src="/ps.png"
                    alt={ps.nama}
                    width={150}
                    height={150}
                    className="object-contain drop-shadow-lg"
                  />
                </div>

                {/* Right Side - Info */}
                <div className="flex flex-1 flex-col justify-center px-6 py-4">
                  <div className="mb-3 w-fit rounded-full bg-[#4B32CE] px-8 py-2 text-center text-xl font-bold text-white shadow-md">
                    {ps.nama}
                  </div>
                  <div className="text-lg font-bold text-[#4B32CE]">
                    Status: {getStatusText(ps.status)}
                  </div>
                </div>
              </div>
            ))}

            {playstations.length === 0 && !loading && (
              <div className="col-span-2 text-center text-gray-500">
                No {psType} available at the moment.
              </div>
            )}
          </div>
        )}
      </main>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
}
