'use client';

import { RecipesResponse } from '@/types/recipe';
import { useQuery } from '@tanstack/react-query';
import RecipeCard from './recipe-card';
import { Skeleton } from './ui/skeleton';

interface SelectedFilter {
  type: 'area' | 'category' | 'ingredient' | null;
  value: string | null;
}

interface RecipeSectionProps {
  selectedFilter: SelectedFilter;
}

const fetchRecipes = async (selectedFilter: SelectedFilter): Promise<RecipesResponse> => {
  const queryParams = new URLSearchParams();

  if (selectedFilter.type && selectedFilter.value) {
    queryParams.append(selectedFilter.type, selectedFilter.value);
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/recipes/getRecipes${
    queryParams.toString() ? `?${queryParams.toString()}` : ''
  }`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data: RecipesResponse = await response.json();
  return data || { recipes: [] };
};

const RecipeSection = ({ selectedFilter }: RecipeSectionProps) => {
  const { data: recipesData, isLoading } = useQuery({
    queryKey: ['recipes', selectedFilter],
    queryFn: () => fetchRecipes(selectedFilter),
  });

  const recipes = recipesData?.recipes || [];

  return (
    <section>
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-semibold">
          {selectedFilter.type && selectedFilter.value ? `${selectedFilter.value}` : 'All'} Recipes
        </h3>
      </div>

      <div className="md:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full" />
            ))}
          </div>
        ) : recipes.length > 0 ? (
          recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)
        ) : (
          <p className="text-center col-span-full">No recipes found.</p>
        )}
      </div>
    </section>
  );
};

export default RecipeSection;
