"use client";
import { useEffect, useState } from "react";

export default function PurchasedRecipesPage() {
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    // 1. Fetch data from localStorage
    const storedData = localStorage.getItem("purchased_recipes");
    
    // 2. Safely parse the data
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setPurchased(parsedData);
      } catch (e) {
        console.error("Failed to parse purchased recipes:", e);
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="p-8">
      <h1 className="text-3xl text-black font-bold mb-6">Purchased Recipes</h1>
      
      {purchased.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500">No purchases found yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-200 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs border-b border-gray-200">
                <th className="p-4">Recipe</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchased.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">{p.title}</td>
                  <td className="p-4 text-gray-700">${p.amount}</td>
                  <td className="p-4 text-gray-700">{p.date}</td>
                  <td className="p-4 text-right">
                    <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-green-700 transition">
                      View Recipe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}