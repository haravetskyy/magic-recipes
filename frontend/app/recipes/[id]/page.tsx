import RecipeCarousel from '@/components/recipe-carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getYouTubeEmbedUrl } from '@/lib/getYouTubeEmbedUrl';
import { processSteps } from '@/lib/processSteps';
import { RecipeInfoResponse, RecipesResponse } from '@/types/recipe';
import { BookOpen, ChefHat, ListChecks, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import RecipeNotFound from './not-found';

const fetchRecipeById = async (id: string): Promise<RecipeInfoResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/getRecipe?id=${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recipe');
  }

  const data: RecipeInfoResponse = await response.json();
  return data || { recipe: null };
};

const fetchRecipesByCategory = async (category: string): Promise<RecipesResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('category', category);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/recipes/getRecipes?${queryParams.toString()}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch recipes by category');
  }

  const data: RecipesResponse = await response.json();
  return data || { recipes: [] };
};

const RecipePage = async ({ params }: { params: { id: string } }) => {
  let recipeData: RecipeInfoResponse['recipe'] = null;
  let relatedRecipes: RecipesResponse['recipes'] = [];

  const { id } = await params;

  try {
    const data = await fetchRecipeById(id);
    recipeData = data.recipe;

    if (recipeData && recipeData.category) {
      const relatedData = await fetchRecipesByCategory(recipeData.category);
      relatedRecipes = relatedData.recipes.filter(recipe => recipe.id !== id);
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    recipeData = null;
  }

  if (!recipeData) {
    return RecipeNotFound();
  }

  return (
    <div className="container mx-auto md:p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <section className="flex flex-row gap-2 justify-between items-end p-6 bg-muted rounded-lg w-full">
          <div className="flex flex-col justify-between gap-2 md:p-6">
            <div className="flex flex-row gap-2">
              <Badge variant="default">{recipeData.category}</Badge>
              <Badge variant="default">{recipeData.area}</Badge>
            </div>

            <div>
              <h2>Let&apos;s Cook Delicious</h2>
              <h1 className="text-6xl font-bold mb-4">{recipeData.name}</h1>
            </div>
          </div>
        </section>

        <Image
          src={recipeData.thumbnail}
          alt={recipeData.name}
          width={300}
          height={300}
          className="object-cover rounded-md w-full md:w-auto"
        />
      </div>

      <section className="flex flex-col gap-4 lg:flex-row justify-between">
        {recipeData.youtubeUrl && (
          <iframe
            src={getYouTubeEmbedUrl(recipeData.youtubeUrl)}
            className="rounded-lg w-full aspect-video"></iframe>
        )}

        <div className="w-full p-6 bg-muted rounded-lg max-h-full">
          <h2 className="text-3xl font-semibold mb-2 flex flex-row items-center justify-between">
            Ingredients <ListChecks />
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipeData.ingredients.map((item, index) => (
              <li key={index} className="flex flex-row gap-2">
                <ShoppingBasket />

                <Button variant="link" className="p-0 h-auto">
                  <Link href={`/?ingredient=${encodeURIComponent(item.ingredient)}`}>
                    {item.measure} {item.ingredient}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <h2 className="text-3xl bg-muted rounded-lg p-6 font-semibold mb-2 flex flex-row items-center justify-between">
        Cooking Instructions <BookOpen />
      </h2>

      <ol className="list-none list-inside flex flex-col gap-4">
        {recipeData.instructions.map((step, index) => (
          <li
            key={index}
            className="flex flex-row gap-4 border bg-card rounded-lg p-6 items-center">
            <p className="text-3xl font-semibold">{processSteps(index)}</p>
            <p>{step}</p>
          </li>
        ))}
      </ol>

      <h2 className="text-3xl font-semibold flex flex-row items-center justify-between bg-muted rounded-lg p-6">
        More {recipeData.category} Recipes <ChefHat />
      </h2>

      <RecipeCarousel recipes={relatedRecipes} />
    </div>
  );
};

export default RecipePage;
