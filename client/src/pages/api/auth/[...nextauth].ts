import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "user-login",
      name: "User Login",
      // @ts-ignore
      authorize: async (credentials, _req) => {
        const result = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });
        if (!result) {
          throw new Error("No User Found");
        }
        const checkPassword = await compare(credentials!.password, result.password as string);
        if (!checkPassword || result.email !== credentials!.email) {
          throw new Error("Check Your Credentials");
        }
        const { password: _, ...user } = result;
        return user as unknown;
      },
    }),
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Login",
      // @ts-ignore
      authorize: async (credentials, _req) => {
        const result = await prisma.admin.findUnique({
          where: {
            email: credentials!.email,
          },
        });
        if (!result) {
          throw new Error("No Admin Found");
        }
        // const checkPassword = await compare(credentials!.password, result.password as string);
        const checkPassword = true;
        if (!checkPassword || result.email !== credentials!.email) {
          throw new Error("Check Your Credentials");
        }
        const { password: _, ...user } = result;
        return user as unknown;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    // @ts-ignore
    session: async (session: any, user: any) => {
      if (!session) return;
      const isAdmin = await prisma.admin.findUnique({
        where: {
          email: session.session.user.email,
        },
      });
      if (isAdmin) {
        session.session.user.role = "admin";
      }
      return Promise.resolve(session.session);
    },
  },
});
