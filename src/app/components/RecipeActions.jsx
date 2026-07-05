"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuHeart, LuBookmark, LuShoppingBag, LuFlag } from "react-icons/lu";

export default function RecipeActions({ id, price, title }) {
  const [likes, setLikes] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load initial state from LocalStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem(`likes_${id}`);
    if (savedLikes) setLikes(parseInt(savedLikes));
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${id}`, newLikes.toString());
    window.dispatchEvent(new Event("engagementChanged"));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isNowFavorite = !isFavorite;
    
    const newFavorites = isNowFavorite 
      ? [...favorites, id] 
      : favorites.filter(favId => favId !== id);
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(isNowFavorite);
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  return (
    <div className="bg-white text-black border border-gray-200 rounded-2xl p-6 shadow-sm mt-12">
      <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={toggleLike} 
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
        >
          <LuHeart /> Like ({likes})
        </button>
        
        <button 
          onClick={toggleFavorite} 
          className={`w-full flex items-center justify-center gap-2 py-3 border rounded-lg transition ${
            isFavorite ? "bg-green-50 border-green-200 text-green-700" : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          <LuBookmark className={isFavorite ? "fill-green-600" : ""} /> 
          {isFavorite ? "Favorited" : "Save to Favorites"}
        </button>
        
        <form action="/api/payment" method="POST" className="w-full">
          <input type="hidden" name="price" value={price} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="recipeId" value={id} />
          <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-green-900 text-white rounded-lg hover:bg-black transition font-semibold">
            <LuShoppingBag /> Purchase Details
          </button>
        </form>

        <Link href={`/recips/${id}/report`} className="w-full flex items-center justify-center gap-2 py-3 text-black hover:text-red-600 transition text-sm">
          <LuFlag size={16} /> Report Issue
        </Link>
      </div>
    </div>
  );
}