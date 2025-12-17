import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Default admin credentials (in production, use database)
        const adminUser = {
          id: "1",
          username: "admin",
          // Password: "admin123" (hashed)
          passwordHash: "$2a$10$rKZqvXxqxqxqxqxqxqxqxOeKqvXxqxqxqxqxqxqxqxqxqxqxqxqxq",
        };

        if (credentials.username === adminUser.username) {
          // For initial setup, accept "admin123" as password
          if (credentials.password === "admin123") {
            return {
              id: adminUser.id,
              username: adminUser.username,
              role: "admin",
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure `session.user` exists before assigning properties to avoid
      // "Cannot read properties of undefined" errors when NextAuth
      // returns a session without a `user` object.
      session.user = session.user ?? {};
      if (token) {
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || "your-secret-key-change-in-production",
});
