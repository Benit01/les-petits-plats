import Image from 'next/image';
import { notFound } from 'next/navigation';
import recipes from '@/data/recipes.json';
import Hero from '@/components/Hero/Hero';
import { formatQuantity } from '@/utils/search';
import styles from './page.module.css';

// La page dépend de l'URL (le slug) pour savoir quoi afficher, ou renvoyer une 404 :
// on indique à Next.js 16 que la navigation vers elle n'est pas "instantanée"
export const instant = false;

function findRecipe(slug) {
  return recipes.find((recipe) => recipe.slug === slug);
}

// Les 50 pages sont générées à l'avance au moment du build
export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

// Titre de l'onglet : le nom de la recette
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = findRecipe(slug);
  return { title: recipe ? `${recipe.name} - Les Petits Plats` : 'Recette introuvable - Les Petits Plats' };
}

export default async function RecipePage({ params }) {
  // Les params sont asynchrones : on les attend avant de lire le slug
  const { slug } = await params;
  const recipe = findRecipe(slug);

  // URL tapée à la main avec une recette qui n'existe pas -> page 404
  if (!recipe) {
    notFound();
  }

  const { name, image, time, ingredients, ustensils, appliance, description, servings } = recipe;

  return (
    <>
      <Hero variant="small" />

      <article className={styles.recipe}>
        <div className={styles.imageWrapper}>
          <Image
            src={`/images/recettes/${image}`}
            alt={name}
            fill
            preload
            sizes="(max-width: 900px) 100vw, 520px"
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.name}>{name}</h1>

          <section>
            <h2 className={styles.label}>Temps de préparation</h2>
            <p className={styles.time}>{time}min</p>
          </section>

          <section>
            <h2 className={styles.label}>Ingrédients</h2>
            <p className={styles.servings}>Pour {servings} {servings > 1 ? 'personnes' : 'personne'}</p>
            <ul className={styles.grid}>
              {ingredients.map((item) => (
                <li key={item.ingredient}>
                  <span className={styles.item}>{item.ingredient}</span>
                  <span className={styles.quantity}>{formatQuantity(item)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.label}>Ustensiles nécessaires</h2>
            <ul className={styles.grid}>
              {ustensils.map((ustensil) => (
                <li key={ustensil}>
                  <span className={styles.item}>{ustensil}</span>
                  <span className={styles.quantity}>1</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.label}>Appareils nécessaires</h2>
            <ul className={styles.grid}>
              <li>
                <span className={styles.item}>{appliance}</span>
                <span className={styles.quantity}>1</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className={styles.label}>Recette</h2>
            <p className={styles.description}>{description}</p>
          </section>
        </div>
      </article>
    </>
  );
}
