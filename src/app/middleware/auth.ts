import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { Row } from "postgres";

<<<<<<< HEAD
export const authenticate = (handler: NextApiHandler) => {
=======
export const authenticate = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) => {
>>>>>>> f598412ddc46164554d3dc5b20f22126a1b2c7a8
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
<<<<<<< HEAD
      console.error("Token validation error:", error);
=======
      console.error("JWT verification error:", error);
>>>>>>> f598412ddc46164554d3dc5b20f22126a1b2c7a8
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};
