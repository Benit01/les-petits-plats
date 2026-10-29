import recipes from '@/data/recipes.json';
import RecipeSearch from '@/components/RecipeSearch/RecipeSearch';

// Page d'accueil (composant serveur) : elle lit les 50 recettes et les confie à la recherche
export default function Home() {
  return <RecipeSearch recipes={recipes} />;
}
