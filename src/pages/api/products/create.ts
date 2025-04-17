import { NextApiRequest, NextApiResponse } from "next";
import { createProduct } from "@app/services/productsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, category, description, price, image_url,user_id } = req.body;

      if (!name || !category || !description || !price || !image_url|| !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newProduct = await createProduct({
        name,
        category,
        description,
        price: Number(price),
        image_url,
        user_id,
      });

      return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Failed to create product" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}