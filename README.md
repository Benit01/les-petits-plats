# Les Petits Plats

Site de recettes réalisé avec **Next.js 16 / React 19** pour la mission « Développez un site de recettes avec React » (OpenClassrooms, parcours *Développez des sites complexes avec React*).

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Fonctionnalités

- Page d'accueil avec les **50 recettes** (`src/data/recipes.json`).
- **Recherche principale** dans le titre, les ingrédients et la description :
  - elle démarre à partir de 3 caractères ;
  - elle ignore les majuscules et les accents ;
  - un *debounce* de 250 ms évite de relancer la recherche à chaque frappe.
- **Recherche par tags** : ingrédients, appareils et ustensiles.
  - Chaque liste a son propre champ de recherche.
  - Un tag choisi disparaît de la liste et s'affiche en jaune sous les filtres.
  - Les résultats sont l'**intersection** de tous les tags choisis.
  - Les listes ne proposent que les éléments des recettes encore affichées.
- Message « Aucune recette ne contient … » quand rien ne correspond.
- Page recette dynamique : `/recette/[slug]`, par exemple `/recette/poisson-cru-a-la-tahitienne`.
- Page **404** pour une recette ou une URL inconnue (`notFound()` + `app/not-found.js`).
- Le moteur de recherche est écrit **sans librairie** (`src/utils/search.js`).

## Organisation

```
src/
├── app/
│   ├── layout.js               polices (Anton, Manrope) + footer
│   ├── page.js                 accueil : charge les recettes
│   ├── not-found.js            page 404
│   └── recette/[slug]/page.js  page d'une recette
├── components/
│   ├── RecipeSearch/           state de la recherche (texte + tags) et liste des recettes
│   ├── SearchBar/              barre de recherche principale (champ contrôlé)
│   ├── TagDropdown/            liste déroulante de tags avec son propre state
│   ├── SelectedTag/            tag jaune sélectionné
│   ├── RecipeCard/             carte d'une recette
│   ├── Hero/  Logo/  Footer/  Icons/
├── hooks/useDebounce.js        hook de debounce
├── utils/search.js             filtrage, listes de tags sans doublon, normalisation
└── data/recipes.json           les 50 recettes
```
