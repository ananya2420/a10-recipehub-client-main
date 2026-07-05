"use client";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe, onLike }) => {
  if (!recipe) return null;


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title || "Recipe"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <div className="text-2xl font-bold text-green-600">${recipe.price}</div>
          <div className="text-sm text-gray-500">Stock: {recipe.quantity}</div>
        </div>

        {/* Like Section Added Below */}
        <div className="flex justify-between items-end mb-3">
         
          <button 
      onClick={() => onLike?.(recipe)}
      className={`transition-colors duration-200 ${recipe.isLiked ? "text-green-500" : "text-gray-400"}`}
    >
      {recipe.isLiked ? "❤️ Liked" : "🤍 Like"}
    </button>
        </div>

        <Link href={`/recips/${recipe._id}`}>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;