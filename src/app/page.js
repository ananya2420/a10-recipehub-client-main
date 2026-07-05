"use client";

import Image from "next/image";
import Banner from "./pages/home/Banner";
import StatsSection from "./pages/home/StatsSection";
import { FeaturedSection } from "./pages/home/FeaturedSection";
import { WhyChooseUsSection } from "./pages/home/WhyChooseUsSection";
import { NewsletterSection } from "./pages/home/NewsletterSection";

import PopularRecipes from "./pages/home/PopularSection";
import RecipeCard from "./components/RecipeCard";
import { useEffect, useState } from "react";

export default function Home() {
  // Replace [] with your actual data source or API call result
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

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

  useEffect(() => {
    setLikedRecipes(readLikedRecipes());

    const handleLikedRecipesChange = () => {
      setLikedRecipes(readLikedRecipes());
    };

    window.addEventListener("likedRecipesChanged", handleLikedRecipesChange);
    window.addEventListener("storage", handleLikedRecipesChange);

    return () => {
      window.removeEventListener("likedRecipesChanged", handleLikedRecipesChange);
      window.removeEventListener("storage", handleLikedRecipesChange);
    };
  }, []);

  const handleLike = (recipeId) => {
    setRecipes(prev => prev.map(r => 
      r._id === recipeId ? { ...r, isLiked: !r.isLiked } : r
    ));
  };

  const handleSharedLike = (recipe) => {
    if (!recipe) return;

    setLikedRecipes((prev) => {
      const exists = prev.some((item) => String(item._id) === String(recipe._id));
      const nextRecipes = exists
        ? prev.filter((item) => String(item._id) !== String(recipe._id))
        : [...prev, { ...recipe, isLiked: true }];

      persistLikedRecipes(nextRecipes);
      return nextRecipes;
    });
  };

  return (
    <div>
     <Banner />
     <StatsSection />
     <FeaturedSection />
     <PopularRecipes recipes={likedRecipes} onLike={(recipe) => handleSharedLike(recipe)} />
     
     <div className="grid grid-cols-3 gap-4">
       {recipes.map(recipe => (
         <RecipeCard key={recipe._id} recipe={recipe} onLike={() => handleLike(recipe._id)} />
       ))}
     </div>

     <WhyChooseUsSection />
     <NewsletterSection />
    </div>
  );
}