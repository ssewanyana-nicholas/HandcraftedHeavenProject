import { NextApiRequest, NextApiResponse } from "next";
import { getProductByUserId} from "@app/services/productsService"; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid or missing user ID" });
      }

      const userId = Number(id);
      const products = await getProductByUserId(userId);

      if (!products) {
        return res.status(404).json({ error: "No products found for the given user ID" });
      }

      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by user ID:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}