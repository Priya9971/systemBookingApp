"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentStatus() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const [status, setStatus] = useState("CHECKING");

  useEffect(() => {
    if (!orderId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        setStatus(data.status || "UNKNOWN");
      } catch (err) {
        console.error("Status Check Error:", err);
        setStatus("ERROR");
      }
    };

    checkStatus();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Payment Status</h1>
        {status === "PENDING" && (
          <p className="text-yellow-600 font-semibold">⏳ Payment Pending...</p>
        )}
        {status === "SUCCESS" && (
          <p className="text-green-600 font-semibold">✅ Payment Successful!</p>
        )}
        {status === "FAILED" && (
          <p className="text-red-600 font-semibold">❌ Payment Failed!</p>
        )}
        {status === "CHECKING" && (
          <p className="text-gray-600">Checking status...</p>
        )}
      </div>
    </div>
  );
}
