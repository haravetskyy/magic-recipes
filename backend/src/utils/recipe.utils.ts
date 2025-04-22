import { TransformedRecipe } from '../recipes/dto/recipe.dto';
import { processInstructions } from './instructions.utils';

export const transformRecipe = (recipe: any): TransformedRecipe => {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() && measure !== null) {
      ingredients.push({ ingredient, measure: measure || '' });
    } else {
      break;
    }
  }

  const instructions = processInstructions(recipe.strInstructions);
  const tags = recipe.strTags ? recipe.strTags.split(',') : null;

  return {
    id: recipe.idMeal,
    name: recipe.strMeal,
    category: recipe.strCategory,
    area: recipe.strArea,
    instructions,
    thumbnail: recipe.strMealThumb,
    tags,
    youtubeUrl: recipe.strYoutube,
    ingredients,
  };
};
