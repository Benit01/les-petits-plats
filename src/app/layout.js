import { Anton, Manrope } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import './globals.css';

// Polices de la maquette : Anton pour les titres, Manrope pour le texte
const anton = Anton({
  weight: '400',
  variable: '--font-anton',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Les Petits Plats',
  description: 'Découvrez nos recettes du quotidien, simples et délicieuses.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${anton.variable} ${manrope.variable}`}>
      <body>
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
