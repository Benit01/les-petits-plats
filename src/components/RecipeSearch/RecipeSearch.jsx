'use client';

import { useMemo, useState } from 'react';
import Hero from '@/components/Hero/Hero';
import SearchBar from '@/components/SearchBar/SearchBar';
import TagDropdown from '@/components/TagDropdown/TagDropdown';
import SelectedTag from '@/components/SelectedTag/SelectedTag';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import useDebounce from '@/hooks/useDebounce';
import { filterRecipes, getTagOptions, MIN_SEARCH_LENGTH } from '@/utils/search';
import styles from './RecipeSearch.module.css';

const FILTERS = [
  { key: 'ingredients', label: 'Ingrédients' },
  { key: 'appliances', label: 'Appareils' },
  { key: 'ustensils', label: 'Ustensiles' },
];

const NO_TAGS = { ingredients: [], appliances: [], ustensils: [] };

// Toute la page d'accueil interactive : recherche principale + tags + liste des recettes
export default function RecipeSearch({ recipes }) {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState(NO_TAGS);

  // La recherche part 250 ms après la dernière frappe (debounce)
  const debouncedQuery = useDebounce(query.trim());

  // Recalculé seulement quand la recherche ou les tags changent
  const results = useMemo(() => filterRecipes(recipes, debouncedQuery, tags), [recipes, debouncedQuery, tags]);
  const options = useMemo(() => getTagOptions(results), [results]);

  // On crée un NOUVEL objet : React voit le changement et réaffiche la page
  const addTag = (key, tag) => setTags({ ...tags, [key]: [...tags[key], tag] });
  const removeTag = (key, tag) => setTags({ ...tags, [key]: tags[key].filter((item) => item !== tag) });

  const selectedTags = FILTERS.flatMap(({ key }) => tags[key].map((tag) => ({ key, tag })));
  const isSearching = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  return (
    <>
      <Hero>
        <h1 className={styles.title}>
          Découvrez nos recettes
          <br />
          du quotidien, simples et délicieuses
        </h1>
        <SearchBar value={query} onChange={setQuery} />
      </Hero>

      <div className={styles.container}>
        <div className={styles.toolbar}>
          <div className={styles.dropdowns}>
            {FILTERS.map(({ key, label }) => (
              <TagDropdown
                key={key}
                label={label}
                options={options[key]}
                selected={tags[key]}
                onSelect={(tag) => addTag(key, tag)}
                onRemove={(tag) => removeTag(key, tag)}
              />
            ))}
          </div>
          <p className={styles.count} aria-live="polite">
            {results.length} {results.length > 1 ? 'recettes' : 'recette'}
          </p>
        </div>

        {selectedTags.length > 0 && (
          <ul className={styles.selectedTags}>
            {selectedTags.map(({ key, tag }) => (
              <SelectedTag key={`${key}-${tag}`} label={tag} onRemove={() => removeTag(key, tag)} />
            ))}
          </ul>
        )}

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className={styles.noResult}>
            {isSearching
              ? `Aucune recette ne contient « ${debouncedQuery} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`
              : 'Aucune recette ne correspond à ces filtres.'}
          </p>
        )}
      </div>
    </>
  );
}
