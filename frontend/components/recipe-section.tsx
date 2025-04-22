'use client';

import { RecipesResponse } from '@/types/recipe';
import { useQuery } from '@tanstack/react-query';
import RecipeCard from './recipe-card';

interface SelectedFilter {
  type: 'area' | 'category' | null;
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
    <section className="md:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)
      ) : (
        <p>No recipes found.</p>
      )}
    </section>
  );
};

export default RecipeSection;
