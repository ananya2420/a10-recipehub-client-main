"use client";
import { useRecipes } from "@/app/context/RecipeContext";

export default function MyRecipesPage() {
  const { recipes, deleteRecipe } = useRecipes();

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black">My Recipes</h1>
        <p className="text-gray-500">{recipes.length} recipe{recipes.length !== 1 ? 's' : ''} published</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Recipe</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Difficulty</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recipes.length > 0 ? (
              recipes.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-black">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
                      {r.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {r.difficulty}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="rounded-lg px-3 py-1 text-sm font-bold text-gray-600 hover:bg-gray-100">View</button>
                    <button className="rounded-lg border border-green-200 px-3 py-1 text-sm font-bold text-green-600 hover:bg-green-50">Edit</button>
                    {/* Added Red Delete Button */}
                    <button 
                      onClick={() => deleteRecipe(r.id)}
                      className="rounded-lg px-3 py-1 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                  No recipes published yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}