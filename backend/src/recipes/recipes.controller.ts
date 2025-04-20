import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get('getRecipes')
  async getAvaliableRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('country') country?: string,
    @Query('category') category?: string,
  ) {
    return this.recipesService.getAvaliableRecipes(ingredient, country, category);
  }

  @Get('getRecipe')
  async getRecipeInfo(@Query('id') id: string) {
    return this.recipesService.getRecipeInfo(id);
  }
}
