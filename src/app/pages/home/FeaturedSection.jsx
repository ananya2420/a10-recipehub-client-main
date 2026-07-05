﻿"use client";

import { useEffect, useState } from "react";
import { getAllRecips } from "@/lib/api/recipe";

const LOCAL_FEATURED_KEY = "featuredRecipeIds";
const LOCAL_DELETED_KEY = "deletedRecipeIds";

const getDifficultyStyle = (difficulty) => {
  const styles = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Medium: 'bg-orange-100 text-orange-700 border-orange-200',
    Hard: 'bg-red-100 text-red-700 border-red-200',
  };
  return styles[difficulty] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const loadIds = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const FeaturedSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeaturedRecipes() {
      try {
        const allRecipes = await getAllRecips();
        const featuredIds = loadIds(LOCAL_FEATURED_KEY);
        const deletedIds = loadIds(LOCAL_DELETED_KEY);

        const visibleFeatured = allRecipes
          .filter((recipe) => !deletedIds.includes(recipe._id))
          .filter((recipe) => recipe.featured || featuredIds.includes(recipe._id))
          .slice(0, 6);

        setRecipes(visibleFeatured);
      } catch (err) {
        console.error("Failed to load featured recipes", err);
        setError(err.message || "Unable to load featured recipes");
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedRecipes();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading featured recipes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!recipes.length) {
    return <div className="text-center text-gray-500">No featured recipes available.</div>;
  }

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
              <img
                src={recipe.image || '/assets/food_1.png'}
                alt={recipe.title || recipe.name || 'Recipe'}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                Featured
              </span>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600">
              {recipe.category || recipe.cuisine || 'General'}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{recipe.title || recipe.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {recipe.cuisine || 'Cuisine'} • {recipe.time || recipe.prepTime || 0} mins
            </p>

            <div className="mt-auto">
              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${getDifficultyStyle(recipe.difficulty || 'Easy')}`}>
                {recipe.difficulty || 'Easy'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};