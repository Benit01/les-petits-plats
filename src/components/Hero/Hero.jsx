import Image from 'next/image';
import Logo from '@/components/Logo/Logo';
import styles from './Hero.module.css';

// Bandeau avec photo de fond : "large" sur l'accueil, "full" sur la 404, "small" sur une recette
export default function Hero({ children, variant = 'large' }) {
  return (
    <header className={`${styles.hero} ${styles[variant]}`}>
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className={styles.background}
      />
      <div className={styles.logo}>
        <Logo />
      </div>
      {children && <div className={styles.content}>{children}</div>}
    </header>
  );
}
