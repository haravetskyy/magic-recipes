'use client';

import FilterSection from '@/components/filter-section';
import Header from '@/components/header';
import RecipeSection from '@/components/recipe-section';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

interface SelectedFilter {
  type: 'area' | 'category' | null;
  value: string | null;
}

const RecipesPage = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<SelectedFilter>({
    type: null,
    value: null,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <main id="main" className="flex flex-col items-center">
        <FilterSection selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        <RecipeSection selectedFilter={selectedFilter} />
      </main>
    </QueryClientProvider>
  );
};

export default RecipesPage;
