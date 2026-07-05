"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllRecips } from "@/lib/api/recipe";
import Link from "next/link";

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavoriteIds(saved);
        
        // Fetch all recipes from API
        const response = await getAllRecips();
        const allRecipes = response.data || response || [];
        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    window.addEventListener("favoritesChanged", loadFavorites);
    return () => window.removeEventListener("favoritesChanged", loadFavorites);
  }, []);

  // Filter recipes that are in favorites
  const favoritedRecipes = recipes.filter((r) => {
    const recipeId = (r._id || "").toString();
    return favoriteIds.includes(recipeId);
  });

  if (loading) return <div className="p-8">Loading your favorites...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl text-black font-bold mb-8">My Favorites</h1>
      
      {favoritedRecipes.length === 0 ? (
        <p className="text-black-500">You have not saved any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritedRecipes.map((recipe) => (
            <div key={recipe._id} className="border rounded-2xl overflow-hidden shadow-sm bg-white">
              {/* Image Section */}
              <div className="relative w-full h-48 bg-gray-100">
                {recipe.image ? (
                  <Image 
                    src={recipe.image} 
                    alt={recipe.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No image available</div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h2 className="text-xl text-black font-bold mb-2">{recipe.title}</h2>
              
                {/* Category and Like Count Section */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                    {recipe.category || "General"}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    ❤️ {localStorage.getItem(`likes_${recipe._id}`) || 0}
                  </span>
                </div>

               {/* Action Buttons */}
<div className="flex gap-3 mt-4">
  <Link 
    href={`/recips/${recipe._id}`} 
    className="flex-1 text-center bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
  >
    View Details
  </Link>
  
<button 
  onClick={() => {
    const updated = favoriteIds.filter(id => id !== recipe._id.toString());
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("favoritesChanged"));
  }}
  className="flex-1 block px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm"
>
  Remove
</button>

 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}