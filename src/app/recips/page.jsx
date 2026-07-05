"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllRecips } from "@/lib/api/recipe";

//import SearchRecipe from "../../components/SearchRecipe";
import RecipeCard from "../components/RecipeCard";
import SearchRecipe from "../components/SearchRecipe";
import CategoryFilter from "../components/CategoryFilter";

export default function RecipsPage() {
  const [recips, setRecips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const searchParams = useSearchParams();
  const itemsPerPage = 6;

  const readLikedRecipes = () => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("likedRecipes") || "[]");
    } catch {
      return [];
    }
  };

  const persistLikedRecipes = (nextRecipes) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("likedRecipes", JSON.stringify(nextRecipes));
    window.dispatchEvent(new Event("likedRecipesChanged"));
  };

  const toggleLike = (recipe) => {
    if (!recipe) return;

    const normalizedId = String(recipe._id);

    setLikedRecipes((prev) => {
      const exists = prev.some((item) => String(item._id) === normalizedId);
      const nextRecipes = exists
        ? prev.filter((item) => String(item._id) !== normalizedId)
        : [...prev, { ...recipe, isLiked: true }];

      persistLikedRecipes(nextRecipes);
      return nextRecipes;
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams.toString()]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllRecips("", "", searchParams.toString());
        setRecips(data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const storedLikedRecipes = readLikedRecipes();
    setLikedRecipes(storedLikedRecipes);

    const handleLikedRecipesChange = () => {
      const refreshedLikedRecipes = readLikedRecipes();
      setLikedRecipes(refreshedLikedRecipes);
    };

    window.addEventListener("likedRecipesChanged", handleLikedRecipesChange);
    window.addEventListener("storage", handleLikedRecipesChange);

    return () => {
      window.removeEventListener("likedRecipesChanged", handleLikedRecipesChange);
      window.removeEventListener("storage", handleLikedRecipesChange);
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(recips.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleRecips = recips.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchRecipe />
      <CategoryFilter />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleRecips.map((r) => (
              <RecipeCard key={r._id} recipe={r} onLike={() => toggleLike(r)} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`rounded border px-3 py-2 text-sm ${page === currentPage ? "bg-green-600 text-white border-green-600" : "border-gray-300 hover:bg-gray-100"}`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}