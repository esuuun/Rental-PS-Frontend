"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import api from "../lib/api";

interface DurationCounterProps {
  bookingId: number;
}

export default function DurationCounter({ bookingId }: DurationCounterProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase environment variables not set");
      // Fallback to polling if Supabase not configured
      startPolling();
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch initial status
    fetchDurationStatus();

    // Subscribe to Realtime channel
    const channel = supabase.channel(`booking-duration:${bookingId}`);

    channel
      .on("broadcast", { event: "duration-update" }, (payload) => {
        console.log("Received duration update:", payload);
        const data = payload.payload as {
          bookingId: number;
          remainingSeconds: number;
          status: "ACTIVE" | "COMPLETED";
        };

        if (data.bookingId === bookingId) {
          setRemainingSeconds(data.remainingSeconds);
          setIsActive(data.status === "ACTIVE" && data.remainingSeconds > 0);
        }
      })
      .subscribe();

    // Also poll as fallback (every 1 minute to reduce resource usage)
    const pollInterval = setInterval(() => {
      fetchDurationStatus();
    }, 60000); // Changed from 5000ms (5 seconds) to 60000ms (1 minute)

    return () => {
      channel.unsubscribe();
      clearInterval(pollInterval);
    };
  }, [bookingId]);

  const fetchDurationStatus = async () => {
    try {
      const response = await api.get(`/bookings/${bookingId}/duration-status`);
      const data = response.data;

      setRemainingSeconds(data.remainingSeconds);
      setIsActive(data.isActive && data.remainingSeconds > 0);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching duration status:", err);
      setError("Gagal memuat status durasi");
    }
  };

  const startPolling = () => {
    // Fallback polling if Supabase not available
    fetchDurationStatus();
    const interval = setInterval(() => {
      fetchDurationStatus();
    }, 60000); // Changed from 1000ms (1 second) to 60000ms (1 minute) to reduce resource usage

    return () => clearInterval(interval);
  };

  // Local countdown timer (updates every second)
  useEffect(() => {
    if (remainingSeconds === null || remainingSeconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev <= 0) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (remainingSeconds === null) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">Memuat durasi...</p>
      </div>
    );
  }

  if (!isActive || remainingSeconds <= 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Waktu pemakaian telah habis
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Terima kasih telah menggunakan layanan kami!
        </p>
      </div>
    );
  }

  const isWarning = remainingSeconds <= 300; // 5 minutes

  return (
    <div
      className={`rounded-lg border p-6 text-center ${
        isWarning
          ? "border-orange-300 bg-orange-50"
          : "border-green-200 bg-green-50"
      }`}
    >
      <p className="mb-2 text-sm font-medium text-gray-700">
        Sisa Waktu Pemakaian
      </p>
      <p
        className={`text-4xl font-bold ${
          isWarning ? "text-orange-600" : "text-green-600"
        }`}
      >
        {formatTime(remainingSeconds)}
      </p>
      {isWarning && (
        <p className="mt-2 text-sm text-orange-600">
          ⚠️ Waktu akan segera habis!
        </p>
      )}
    </div>
  );
}

