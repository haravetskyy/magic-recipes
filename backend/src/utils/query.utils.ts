import { RecipeFilter } from '../recipes/dto/recipe.dto';

export const buildQueryParams = (filters: RecipeFilter): string[] => {
  const queryParams: string[] = [];

  if (filters.ingredient) {
    queryParams.push(`i=${encodeURIComponent(filters.ingredient)}`);
  }
  if (filters.area) {
    queryParams.push(`a=${encodeURIComponent(filters.area)}`);
  }
  if (filters.category) {
    queryParams.push(`c=${encodeURIComponent(filters.category)}`);
  }

  return queryParams;
};
