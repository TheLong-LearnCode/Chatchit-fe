import { API_URL } from "@/lib/Constants";
import axios from "axios";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await axios.post(
      `${API_URL}auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
      }
    );

    const response = res.data;
    console.log(response);

    return {
      ...token,
      backendTokens: response,
    };
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return {
      ...token,
      error: "RefreshTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "mail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;
        const res = await axios.post(
          `${API_URL}auth/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 401) {
          console.log(res.statusText);
          return null;
        }
        const user = res.data;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
