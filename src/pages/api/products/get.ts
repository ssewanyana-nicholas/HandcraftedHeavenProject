import { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "@app/services/productsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const product = await getProductById(Number(id));

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}