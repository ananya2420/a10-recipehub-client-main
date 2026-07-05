import { getAllRecips } from "@/lib/api/recipe";
import RecipeCard from "../../../components/RecipeCard";
import SearchRecipe from "../../../components/SearchRecipe";
import CategoryFilter from "../../../components/CategoryFilter";
import Link from "next/link";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const paramsList = await searchParams;
  const search = paramsList?.search || "";
  
  // Decode the category from URL
  const decodedCategory = decodeURIComponent(category);
  
  const recips = await getAllRecips(search, decodedCategory);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/recips" className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 font-medium">
        ← Back to All Recipes
      </Link>
      
      <h1 className="text-4xl font-extrabold text-green-800 mb-2 text-center">
        {decodedCategory}
      </h1>
      <p className="text-green-600 text-center mb-8 italic">
        Browse our delicious {decodedCategory.toLowerCase()} recipes.
      </p>

      <div className="text-center mb-6">
        <SearchRecipe />
      </div>

      <CategoryFilter />

      {recips && recips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recips.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-green-200 rounded-lg">
          <p className="text-green-500 text-lg">No recipes found in this category.</p>
        </div>
      )}
    </div>
  );
}
