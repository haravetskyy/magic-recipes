import { RecipesResponse } from '@/types/recipe';
import RecipeCard from './recipe-card';

const fetchAllRecipes = async (): Promise<RecipesResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/getRecipes`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch all recipes');
  }

  const data: RecipesResponse = await response.json();
  return data || { recipes: [] };
};

let recipes: RecipesResponse['recipes'] = [];

try {
  const recipesData = await fetchAllRecipes();
  recipes = recipesData.recipes || [];
} catch (error) {
  console.error('Error fetching recipes:', error);
  recipes = [];
}

const RecipeSection = async () => {
  return (
    <section className="md:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {recipes.length > 0 ? (
        recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)
      ) : (
        <p>No recipes found.</p>
      )}
    </section>
  );
};

export default RecipeSection;
