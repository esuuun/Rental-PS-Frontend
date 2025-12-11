import { useEffect, useState } from "react";

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
const SNAP_SCRIPT_URL =
  process.env.NEXT_PUBLIC_SNAP_SCRIPT_URL ||
  "https://app.sandbox.midtrans.com/snap/snap.js"; // Change to production URL if needed

export const useSnap = () => {
  const [isSnapLoaded, setIsSnapLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "midtrans-snap-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = SNAP_SCRIPT_URL;
      script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
      script.async = true;
      script.onload = () => setIsSnapLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsSnapLoaded(true);
    }

    return () => {
      // Optional: Cleanup script if needed, but usually we keep it
    };
  }, []);

  const snapPay = (
    snapToken: string,
    callbacks: {
      onSuccess?: (result: any) => void;
      onPending?: (result: any) => void;
      onError?: (result: any) => void;
      onClose?: () => void;
    },
  ) => {
    if (isSnapLoaded && window.snap) {
      window.snap.pay(snapToken, {
        onSuccess:
          callbacks.onSuccess || ((result) => console.log("Success:", result)),
        onPending:
          callbacks.onPending || ((result) => console.log("Pending:", result)),
        onError:
          callbacks.onError || ((result) => console.log("Error:", result)),
        onClose: callbacks.onClose || (() => console.log("Closed")),
      });
    } else {
      console.error("Snap is not loaded yet");
    }
  };

  return { isSnapLoaded, snapPay };
};
