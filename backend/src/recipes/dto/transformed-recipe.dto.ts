export interface TransformedRecipe {
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

export interface TransformedRecipesResponse {
  recipes: TransformedRecipe[];
}

export interface TransformedRecipeInfoResponse {
  recipe: TransformedRecipe | null;
}

export interface TransformedFilterResponse {
  values: string[];
}
