"use client";
import { useEffect, useState } from "react";
import { useRecipes } from "@/app/context/RecipeContext";

export default function DashboardOverview() {
  const { recipes } = useRecipes();
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [engagementCount, setEngagementCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      // 1. Get Purchases
      const storedPurchases = localStorage.getItem("purchased_recipes");
      if (storedPurchases) setPurchaseCount(JSON.parse(storedPurchases).length);

      // 2. Get Favorites
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) setFavoriteCount(JSON.parse(storedFavorites).length);

      // 3. Calculate Total Engagement (Sum of all "likes_" keys)
      let totalLikes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("likes_")) {
          totalLikes += parseInt(localStorage.getItem(key) || "0");
        }
      }
      setEngagementCount(totalLikes);
    };

    // Initial run
    updateCounts();

    // Listen for custom events
    window.addEventListener("favoritesChanged", updateCounts);
    window.addEventListener("engagementChanged", updateCounts);

    return () => {
      window.removeEventListener("favoritesChanged", updateCounts);
      window.removeEventListener("engagementChanged", updateCounts);
    };
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h1>
        <p className="text-gray-500">Welcome back. Here is your command center.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Purchased Recipes", count: purchaseCount.toString() },
          { label: "Saved Favorites", count: favoriteCount.toString() },
          { label: "Total Engagement", count: engagementCount.toString() },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <h3 className="text-3xl text-black font-bold mb-4">{stat.count}</h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline">View details →</button>
          </div>
        ))}
      </section>
      
      <section className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <span className="font-bold text-green-600">●</span>
          <p className="font-medium text-gray-600">Storage Limit: {recipes?.length || 0}/2 Recipes</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition">
          Upgrade Account
        </button>
      </section>

      <section className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold mb-6 text-black">Quick Actions</h3>
        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition">Create new recipe</button>
          <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition">Browse gallery</button>
        </div>
      </section>
    </div>
  );
}