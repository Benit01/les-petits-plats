import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import styles from './not-found.module.css';

// Affichée par notFound() (recette inconnue) et pour toute URL qui n'existe pas
export default function NotFound() {
  return (
    <Hero variant="full">
      <h1 className={styles.code}>404 :(</h1>
      <p className={styles.message}>La page que vous demandez est introuvable.</p>
      <Link href="/" className={styles.home}>
        Retour aux recettes
      </Link>
    </Hero>
  );
}
