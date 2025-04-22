import FilterSection from '@/components/filter-section';
import Header from '@/components/header';
import RecipeSection from '@/components/recipe-section';

const RecipeListPage = () => (
  <>
    <Header />

    <main id="main" className="flex flex-col items-center">
      <FilterSection />
      <RecipeSection />
    </main>
  </>
);

export default RecipeListPage;
