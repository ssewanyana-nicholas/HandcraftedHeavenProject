export async function fetchProductsByUserId(userId: number) {
  try {
    const response = await fetch(`/api/products/user?id=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products for user ID: " + userId);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products for user ID:", userId, error);
    return [];
  }
}