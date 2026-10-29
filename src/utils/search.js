// Moteur de recherche des recettes (sans librairie, cf. règle de gestion n°8)

export const MIN_SEARCH_LENGTH = 3;

// "Crème" -> "creme" : minuscules et sans accents, pour comparer sans se soucier de la saisie
export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

// "lait de coco" -> "Lait de coco"
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Recherche principale : titre, ingrédients ou description
function matchesQuery(recipe, query) {
  if (query.length < MIN_SEARCH_LENGTH) {
    return true;
  }
  const search = normalize(query);
  return (
    normalize(recipe.name).includes(search) ||
    normalize(recipe.description).includes(search) ||
    recipe.ingredients.some(({ ingredient }) => normalize(ingredient).includes(search))
  );
}

// Tags : la recette doit contenir TOUS les tags sélectionnés (intersection, règle n°6)
function matchesTags(recipe, tags) {
  const ingredients = recipe.ingredients.map(({ ingredient }) => normalize(ingredient));
  const ustensils = recipe.ustensils.map(normalize);
  const appliance = normalize(recipe.appliance);

  return (
    tags.ingredients.every((tag) => ingredients.includes(normalize(tag))) &&
    tags.ustensils.every((tag) => ustensils.includes(normalize(tag))) &&
    tags.appliances.every((tag) => appliance === normalize(tag))
  );
}

export function filterRecipes(recipes, query, tags) {
  return recipes.filter((recipe) => matchesQuery(recipe, query) && matchesTags(recipe, tags));
}

// Liste sans doublon (ex. "Sucre" et "sucre" ne comptent qu'une fois), triée par ordre alphabétique
function uniqueValues(values) {
  const byKey = new Map();
  values.forEach((value) => {
    const key = normalize(value);
    if (!byKey.has(key)) {
      byKey.set(key, capitalize(value.trim()));
    }
  });
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, 'fr'));
}

// Options des 3 listes, calculées à partir des recettes encore affichées (règle n°5)
export function getTagOptions(recipes) {
  return {
    ingredients: uniqueValues(recipes.flatMap((recipe) => recipe.ingredients.map(({ ingredient }) => ingredient))),
    appliances: uniqueValues(recipes.map((recipe) => recipe.appliance)),
    ustensils: uniqueValues(recipes.flatMap((recipe) => recipe.ustensils)),
  };
}

// 400 + "ml" -> "400ml" ; 30 + "grammes" -> "30g" ; 2 + "cuillères à soupe" -> "2 cuillères à soupe"
export function formatQuantity({ quantity, unit }) {
  if (quantity === undefined) {
    return '';
  }
  const shortUnits = { grammes: 'g', gramme: 'g', ml: 'ml', cl: 'cl', kg: 'kg', litres: 'L', litre: 'L' };
  if (!unit) {
    return String(quantity);
  }
  return shortUnits[unit] ? `${quantity}${shortUnits[unit]}` : `${quantity} ${unit}`;
}
