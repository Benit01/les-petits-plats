'use client';

import { SearchIcon, CloseIcon } from '@/components/Icons/Icons';
import styles from './SearchBar.module.css';

// Champ contrôlé : la valeur vit dans le state du parent (RecipeSearch)
export default function SearchBar({ value, onChange }) {
  return (
    <form className={styles.searchBar} role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="main-search" className="visually-hidden">
        Rechercher une recette
      </label>
      <input
        id="main-search"
        type="search"
        className={styles.input}
        placeholder="Rechercher une recette, un ingrédient, ..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" className={styles.clear} onClick={() => onChange('')} aria-label="Effacer la recherche">
          <CloseIcon className={styles.clearIcon} />
        </button>
      )}
      <button type="submit" className={styles.submit} aria-label="Lancer la recherche">
        <SearchIcon className={styles.searchIcon} />
      </button>
    </form>
  );
}
