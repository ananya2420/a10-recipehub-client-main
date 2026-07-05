"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PremiumSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("No session found");
      return;
    }

    const verifyPayment = async () => {
      try {
        // Verify the session with Stripe
        const response = await fetch("/api/webhook/verify-premium", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          setStatus("success");
          setMessage("Welcome to Premium! Your upgrade is complete.");
          
          // Redirect to premium page after 2 seconds
          setTimeout(() => {
            router.push("/dashboard/premium");
          }, 2000);
        } else {
          setStatus("error");
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
        setMessage("Error processing payment. Please try again.");
      }
    };

    verifyPayment();
  }, [sessionId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        {status === "loading" && (
          <>
            <div className="text-4xl mb-4">⏳</div>
            <h1 className="text-2xl font-bold mb-2">Processing Payment</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-4xl mb-4">✓</div>
            <h1 className="text-2xl font-bold mb-2 text-green-600">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-4xl mb-4">✗</div>
            <h1 className="text-2xl font-bold mb-2 text-red-600">Payment Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link 
              href="/dashboard/premium" 
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Back to Premium
            </Link>
          </>
        )}
      </div>
    </div>
  );
}