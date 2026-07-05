import RecipeCard from "@/app/components/RecipeCard";

const PopularRecipes = ({ recipes,onLike }) => {
  // Safety check: if recipes is missing or empty, don't try to sort it
  if (!recipes || recipes.length === 0) return <p>No liked recipes yet!</p>;

  // Keep all liked recipes visible instead of limiting to three cards
  const popularRecipes = [...recipes].sort((a, b) => (b.likes || 0) - (a.likes || 0));

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold">Popular (Liked) Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} onLike={() => onLike(recipe)} />
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;