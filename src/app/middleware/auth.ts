import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { Row } from "postgres";

export const authenticate = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as Row).user = decoded; // Attach user info to the request object
      return handler(req, res);
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};
