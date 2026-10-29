'use client';

import { useState } from 'react';
import { normalize } from '@/utils/search';
import { ChevronIcon, CloseIcon, SearchIcon } from '@/components/Icons/Icons';
import styles from './TagDropdown.module.css';

// Une liste déroulante de tags (Ingrédients, Appareils ou Ustensiles)
export default function TagDropdown({ label, options, selected, onSelect, onRemove }) {
  // State local : ouvert / fermé, et texte tapé dans le petit champ de recherche
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');

  // Les tags déjà choisis disparaissent de la liste disponible
  const available = options.filter(
    (option) => !selected.includes(option) && normalize(option).includes(normalize(filter))
  );

  const listId = `tag-list-${normalize(label)}`;

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={listId}
      >
        {label}
        <ChevronIcon className={styles.chevron} />
      </button>

      {isOpen && (
        <div className={styles.panel} id={listId}>
          <div className={styles.filter}>
            <label htmlFor={`${listId}-input`} className="visually-hidden">
              Filtrer les {label.toLowerCase()}
            </label>
            <input
              id={`${listId}-input`}
              type="text"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              autoComplete="off"
            />
            {filter && (
              <button type="button" className={styles.iconButton} onClick={() => setFilter('')} aria-label="Effacer">
                <CloseIcon className={styles.smallIcon} />
              </button>
            )}
            <SearchIcon className={styles.smallIcon} />
          </div>

          {selected.length > 0 && (
            <ul className={styles.selectedList}>
              {selected.map((tag) => (
                <li key={tag}>
                  <button type="button" className={styles.selectedItem} onClick={() => onRemove(tag)}>
                    {tag}
                    <span className={styles.removeDot} aria-hidden="true">
                      <CloseIcon className={styles.tinyIcon} />
                    </span>
                    <span className="visually-hidden"> (retirer)</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <ul className={styles.options}>
            {available.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={styles.option}
                  onClick={() => {
                    onSelect(option);
                    setFilter('');
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
            {available.length === 0 && <li className={styles.empty}>Aucun résultat</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
