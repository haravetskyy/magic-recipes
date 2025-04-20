import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getHello(@Query('id') id: string) {
    return this.recipesService.getFullMealDetailsById(id);
  }
}
