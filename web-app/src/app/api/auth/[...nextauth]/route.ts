import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: { label: "userName", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await axios.post(
          "http://localhost:8080/user/login",
          JSON.stringify({
            userName: credentials?.userName,
            password: credentials?.password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await response.data;

        if (user && response.status === 200) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "token" in user) {
        token.token = user.token;
        token.name = user.name;
        //@ts-ignore
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.token = token.token as any;
      session.user.name = token.name as any;
      session.user.lastName = token.lastName as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
