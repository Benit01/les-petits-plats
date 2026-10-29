import Image from 'next/image';
import Link from 'next/link';
import { formatQuantity } from '@/utils/search';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ recipe }) {
  const { slug, image, name, time, description, ingredients } = recipe;

  return (
    <article className={styles.card}>
      <Link href={`/recette/${slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={`/images/recettes/${image}`}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className={styles.image}
          />
          <span className={styles.time}>{time}min</span>
        </div>

        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>

          <h3 className={styles.label}>Recette</h3>
          <p className={styles.description}>{description}</p>

          <h3 className={styles.label}>Ingrédients</h3>
          <ul className={styles.ingredients}>
            {ingredients.map((item) => (
              <li key={item.ingredient}>
                <span className={styles.ingredient}>{item.ingredient}</span>
                <span className={styles.quantity}>{formatQuantity(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
