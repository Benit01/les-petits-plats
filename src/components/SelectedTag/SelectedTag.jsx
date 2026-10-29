import { CloseIcon } from '@/components/Icons/Icons';
import styles from './SelectedTag.module.css';

// Tag jaune affiché sous les filtres ; la croix le retire de la recherche
export default function SelectedTag({ label, onRemove }) {
  return (
    <li className={styles.tag}>
      {label}
      <button type="button" className={styles.remove} onClick={onRemove} aria-label={`Retirer le tag ${label}`}>
        <CloseIcon className={styles.icon} />
      </button>
    </li>
  );
}
