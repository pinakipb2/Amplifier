import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Awaitable } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

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
      name: "Credentials",
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
        const checkPassword = await compare(credentials!.password as string, result.password);
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
});
