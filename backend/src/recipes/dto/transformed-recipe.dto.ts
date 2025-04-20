import { ApiProperty } from '@nestjs/swagger';

export class TransformedRecipe {
  @ApiProperty({ description: 'The unique identifier of the recipe' })
  id: string;

  @ApiProperty({ description: 'The name of the recipe' })
  name: string;

  @ApiProperty({ description: 'The category of the recipe (e.g., "Chicken", "Dessert")' })
  category: string;

  @ApiProperty({ description: 'The geographical area of the recipe (e.g., "Japanese", "Italian")' })
  area: string;

  @ApiProperty({ description: 'An array of instruction steps for preparing the recipe' })
  instructions: string[];

  @ApiProperty({ description: "URL to the recipe's thumbnail image" })
  thumbnail: string;

  @ApiProperty({
    description: 'Array of tags associated with the recipe (e.g., ["Meat", "Casserole"])',
    nullable: true,
  })
  tags: string[] | null;

  @ApiProperty({ description: 'URL to a YouTube video for the recipe' })
  youtubeUrl: string;

  @ApiProperty({ description: 'Array of ingredients with their measures', type: [Object] })
  ingredients: { ingredient: string; measure: string }[];
}

export class TransformedRecipesResponse {
  @ApiProperty({ description: 'Array of transformed recipes', type: [TransformedRecipe] })
  recipes: TransformedRecipe[];
}

export class TransformedRecipeInfoResponse {
  @ApiProperty({
    description: 'A single transformed recipe, or null if not found',
    type: TransformedRecipe,
    nullable: true,
  })
  recipe: TransformedRecipe | null;
}

export class TransformedFilterResponse {
  @ApiProperty({
    description: 'Array of filter values (e.g., ["Japanese", "Canadian"] for area)',
    type: [String],
  })
  values: string[];
}
