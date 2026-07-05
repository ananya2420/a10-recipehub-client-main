"use client";
import { createContext, useState, useContext } from "react";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes((prev) => [
      ...prev, 
      { 
        ...recipe, 
        id: Date.now().toString(), // Force ID to String
        date: new Date().toLocaleDateString('en-GB') 
      }
    ]);
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id.toString() !== id.toString()));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipeContext);