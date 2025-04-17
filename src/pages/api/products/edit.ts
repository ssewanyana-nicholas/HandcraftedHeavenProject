import { NextApiRequest, NextApiResponse } from "next";
import { updateProduct } from "@app/services/productsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const { id, name, category, description, price, image_url } = req.body;

      if (!id || !name || !category || !description || !price || !image_url) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const updatedProduct = await updateProduct(
        Number(id), // Use the ID provided in the body
        name,
        category,
        description,
        Number(price),
        image_url
      );

      return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ error: "Failed to update product" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}