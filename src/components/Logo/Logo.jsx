import Link from 'next/link';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Les Petits Plats, retour à l'accueil">
      Les Petits Plats
      <span className={styles.dot} aria-hidden="true" />
    </Link>
  );
}
