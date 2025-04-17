import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@app/middleware/auth";
import { Row } from "postgres";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = (req as Row).user; // Access user info from the middleware
  res
    .status(200)
    .json({ success: true, message: "Welcome to the protected route!", user });
};

export default authenticate(handler);
