export interface RecipeFilter {
  country?: string;
  ingredient?: string;
  category?: string;
}

export function buildRecipeQuery(filters: RecipeFilter): string {
  const baseUrl = `${process.env.API_BASE_URL}/filter.php`;
  const queryParams: string[] = [];

  if (filters.country) {
    queryParams.push(`a=${encodeURIComponent(filters.country)}`);
  }
  if (filters.ingredient) {
    queryParams.push(`i=${encodeURIComponent(filters.ingredient)}`);
  }
  if (filters.category) {
    queryParams.push(`c=${encodeURIComponent(filters.category)}`);
  }

  return queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;
}
