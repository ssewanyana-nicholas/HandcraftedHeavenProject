import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

// Define NextAuth configuration
const authOptions = {
  providers: [], // Empty array to indicate no providers for now
  
  callbacks: {
    // JWT callback: adding user ID to the token
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id; // Assign user ID to the token
      }
      return token;
    },
    
    // Session callback: adding token ID to the session object
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string; // Ensure `id` is added to the session user
      }
      return session;
    },
  },
};

// Export the handler function, not the default NextAuth function
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
