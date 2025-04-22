export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string[];
  thumbnail: string;
  tags: string[] | null;
  youtubeUrl: string;
  ingredients: { ingredient: string; measure: string }[];
}

export interface RecipesResponse {
  recipes: Recipe[];
}

export interface RecipeInfoResponse {
  recipe: Recipe | null;
}
