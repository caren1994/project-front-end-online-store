// import * as api from "./services/api";

export async function getCategories() {
  const response = await fetch(

    'https://api.mercadolibre.com/sites/MLB/categories',

  );
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const responseQuery = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`,
  );
  const categoria = await responseQuery.json();
  return categoria;
}
export async function getProductById(productId) {
  const responseQuery = await fetch(
    `https://api.mercadolibre.com/items/${productId}`,
  );
  const categoria = await responseQuery.json();
  return categoria;
}
export function setLocal(elems) {
  localStorage.setItem('produto', JSON.stringify(elems));
}
