
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Customers',
};
export async function fetchUsers() {
    try {
      const response = await fetch("/api/sellers/all");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }