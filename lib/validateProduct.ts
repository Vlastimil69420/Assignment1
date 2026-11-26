// lib/validateProduct.ts
// Checks the values sent from the Add and Update forms before they go into the database.
// Used by /api/addProduct and /api/updateProduct.

export function validateProduct(params: URLSearchParams) {
  const brand = params.get("brand")?.trim() ?? "";
  const model = params.get("model")?.trim() ?? "";
  const description = params.get("description")?.trim() ?? "";
  const priceText = params.get("price")?.trim() ?? "";

  // check they exist
  if (!brand || !model || !description || !priceText) {
    return { error: "Brand, model, price and description are required" };
  }

  // check they are not too long
  if (brand.length > 50) {
    return { error: "Brand must be 50 characters or less" };
  }
  if (model.length > 100) {
    return { error: "Model must be 100 characters or less" };
  }
  if (description.length > 1000) {
    return { error: "Description must be 1000 characters or less" };
  }

  // the price must be a real number above 0
  const price = Number(priceText);
  if (isNaN(price)) {
    return { error: "Price must be a number" };
  }
  if (price <= 0 || price > 100000) {
    return { error: "Price must be between 0 and 100000" };
  }

  return { data: { brand, model, price, description } };
}
