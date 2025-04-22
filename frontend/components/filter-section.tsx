'use client';

import { FilterResponse, FilterValue, SelectedFilter } from '@/types/filter';
import { useQuery } from '@tanstack/react-query';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

interface FilterSectionProps {
  selectedFilter: SelectedFilter;
  setSelectedFilter: (filter: SelectedFilter) => void;
}

const fetchFilterValues = async (
  filterType: 'ingredient' | 'area' | 'category',
): Promise<FilterValue[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/getFilters?filter=${filterType}`,
    { cache: 'no-store' },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${filterType} filters`);
  }

  const data: FilterResponse = await response.json();
  return data.values || [];
};

const FilterLoader = ({ length }: { length: number }) => {
  const widthClasses = ['w-12', 'w-14', 'w-16', 'w-18'] as const;

  return (
    <>
      {Array.from({ length: length }, (_, index) => (
        <Skeleton key={index} className={`h-4 ${widthClasses[index % widthClasses.length]}`} />
      ))}
    </>
  );
};

const FilterSection = ({ selectedFilter, setSelectedFilter }: FilterSectionProps) => {
  const { data: areaFilters = [], isLoading: isLoadingAreas } = useQuery({
    queryKey: ['areaFilters'],
    queryFn: () => fetchFilterValues('area'),
  });

  const { data: categoryFilters = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categoryFilters'],
    queryFn: () => fetchFilterValues('category'),
  });

  const toggleFilter = (filterType: 'area' | 'category', filterValue: string) => {
    if (selectedFilter.type === filterType && selectedFilter.value === filterValue) {
      setSelectedFilter({ type: null, value: null });
    } else {
      setSelectedFilter({ type: filterType, value: filterValue });
    }
  };

  return (
    <section className="flex flex-col gap-4 md:p-4 items-center w-full">
      <h2 className="font-semibold text-4xl">What to cook?</h2>

      <Accordion type="multiple" className="w-full" defaultValue={['areas', 'categories']}>
        <AccordionItem value="areas">
          <AccordionTrigger className="w-full">Filter by area</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap gap-2">
            {isLoadingAreas ? (
              <FilterLoader length={36} />
            ) : (
              areaFilters.map(area => (
                <Badge
                  key={area.id}
                  variant={
                    selectedFilter.type === 'area' && selectedFilter.value === area.name
                      ? 'default'
                      : 'outline'
                  }
                  className="cursor-pointer"
                  onClick={() => toggleFilter('area', area.name)}>
                  {area.name}
                </Badge>
              ))
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger className="w-full">Filter by category</AccordionTrigger>
          <AccordionContent className="flex flex-row flex-wrap gap-2">
            {isLoadingCategories ? (
              <FilterLoader length={20} />
            ) : (
              categoryFilters.map(category => (
                <Badge
                  key={category.id}
                  variant={
                    selectedFilter.type === 'category' && selectedFilter.value === category.name
                      ? 'default'
                      : 'outline'
                  }
                  className="cursor-pointer"
                  onClick={() => toggleFilter('category', category.name)}>
                  {category.name}
                </Badge>
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FilterSection;
