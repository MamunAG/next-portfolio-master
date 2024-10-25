import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { User } from "@prisma/client";
import { saltAndHashPassword } from "@/utility/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const pwHash = await saltAndHashPassword(password);

          const user = await getUserFromDb(email, pwHash);
          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          throw error;
        }
      },
    }),
  ],
});

async function getUserFromDb(
  email: string,
  pwHash: string
): Promise<User | null> {
  // return await prisma.user.findFirst({
  //   where: { email, password: pwHash },
  // });
  return await prisma.user.findFirst();
}
