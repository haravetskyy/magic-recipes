'use client';

import FilterSection from '@/components/filter-section';
import Header from '@/components/header';
import RecipeSection from '@/components/recipe-section';
import { Skeleton } from '@/components/ui/skeleton';
import { SelectedFilter } from '@/types/filter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const queryClient = new QueryClient();

const RecipesPage = () => {
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = React.useState<SelectedFilter>({
    type: null,
    value: null,
  });

  React.useEffect(() => {
    const ingredient = searchParams.get('ingredient');
    if (ingredient) {
      setSelectedFilter({ type: 'ingredient', value: ingredient });
    } else {
      setSelectedFilter({ type: null, value: null });
    }
  }, [searchParams]);

  return (
    <Suspense
      fallback={
        <div className="md:p-4 flex flex-col gap-4">
          <Skeleton className="aspect-video w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      }>
      <QueryClientProvider client={queryClient}>
        <Header />

        <main id="main" className="flex flex-col items-center">
          <FilterSection selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
          <RecipeSection selectedFilter={selectedFilter} />
        </main>
      </QueryClientProvider>
    </Suspense>
  );
};

export default RecipesPage;
