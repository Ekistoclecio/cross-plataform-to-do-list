import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      name: string;
      lastName: string;
    };
  }
}
