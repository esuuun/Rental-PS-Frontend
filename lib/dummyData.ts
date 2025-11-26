export interface PlayStation {
  id: number;
  nama: string;
  tipe: string;
  lokasi: string;
  status: "AVAILABLE" | "MAINTENANCE" | "OFFLINE";
  macAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export const DUMMY_PLAYSTATIONS: PlayStation[] = [
  {
    id: 1,
    nama: "PS5-01",
    tipe: "PS5",
    lokasi: "Jakarta",
    status: "AVAILABLE",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    nama: "PS5-02",
    tipe: "PS5",
    lokasi: "Jakarta",
    status: "AVAILABLE",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    nama: "PS5-03",
    tipe: "PS5",
    lokasi: "Jakarta",
    status: "MAINTENANCE",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    nama: "PS5-04",
    tipe: "PS5",
    lokasi: "Jakarta",
    status: "AVAILABLE",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    nama: "PS4-01",
    tipe: "PS4",
    lokasi: "Jakarta",
    status: "AVAILABLE",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 6,
    nama: "PS4-02",
    tipe: "PS4",
    lokasi: "Bandung",
    status: "OFFLINE",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
];

export const getDummyPlayStations = (tipe?: string, lokasi?: string) => {
  let filtered = DUMMY_PLAYSTATIONS;
  if (tipe) {
    filtered = filtered.filter((ps) => ps.tipe === tipe);
  }
  if (lokasi) {
    filtered = filtered.filter((ps) =>
      ps.lokasi.toLowerCase().includes(lokasi.toLowerCase()),
    );
  }
  return {
    available: true,
    playStations: filtered,
    count: filtered.length,
  };
};

export const createDummyBooking = (data: any) => {
  return {
    success: true,
    booking: {
      id: Math.floor(Math.random() * 1000),
      ...data,
      status: "PENDING",
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

export const createDummyPayment = (bookingId: number) => {
  return {
    success: true,
    payment: {
      id: Math.floor(Math.random() * 1000),
      bookingId,
      midtransOrderId: `ORDER-${Date.now()}`,
      amount: 50000,
      status: "PENDING",
      snapToken: "dummy-snap-token", // This won't work with real Snap.js, need to handle mock flow
      redirectUrl: "http://localhost:3000/payment-success",
    },
  };
};
