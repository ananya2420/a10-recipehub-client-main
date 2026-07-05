import Image from "next/image";
import Link from "next/link";
import { getRecipeById } from "@/lib/api/recipe";
import RecipeActions from "@/app/components/RecipeActions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;
  
  // Retrieve token
  //const result = await auth.api.getToken({ headers: await headers() });
  
  // Extract token string correctly
  // If result is { token: "..." }, token becomes result.token
  //const token = typeof result === 'string' ? result : result?.token;
  //console.log(token);

  // Pass token to API
  const recipe = await getRecipeById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/recips" className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 font-medium">
        Back to Recipes
      </Link>

      {recipe ? (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">
              {/* Image Section */}
              <div className="relative h-96 w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                {recipe.image ? (
                  <Image src={recipe.image} alt={recipe.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No image available</div>
                )}
              </div>

              {/* Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
                  <div className="text-3xl font-extrabold text-green-600 mb-4">${recipe.price}</div>
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${parseInt(recipe.quantity) > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {parseInt(recipe.quantity) > 0 ? `In Stock (${recipe.quantity} available)` : "Out of Stock"}
                  </span>
                  
                  <div className="mt-6 border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                    <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition duration-200 shadow-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <RecipeActions
            id={recipe._id} 
            price={recipe.price} 
            title={recipe.title} 
          />
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <h2 className="text-2xl font-bold text-gray-600">Recipe Not Found</h2>
          <Link href="/recips" className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700">Browse All Recipes</Link>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailsPage;