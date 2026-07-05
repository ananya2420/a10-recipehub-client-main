"use client";
import { useEffect } from "react";

export default function PurchaseSaver({ session }) {
  useEffect(() => {
    // Check if the session exists and is complete
    if (session && session.status === "complete") {
      const newPurchase = {
        id: session.id,
        date: new Date().toLocaleDateString(),
        // Accessing the plain object structure
        title: session.line_items?.data[0]?.description || "Recipe Purchase",
        amount: (session.amount_total / 100).toFixed(2),
      };

      const existing = JSON.parse(localStorage.getItem("purchased_recipes") || "[]");
      
      // Prevent duplicates
      if (!existing.find(p => p.id === newPurchase.id)) {
        localStorage.setItem("purchased_recipes", JSON.stringify([...existing, newPurchase]));
      }
    }
  }, [session]);

  return null; 
}