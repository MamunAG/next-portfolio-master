import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { saltAndHashPassword } from "@/utility/password";
import { getUserFromDb } from "./actions/user-action";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
          //  const role = auth?.user.role || 'user';
          if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            if (pathname.startsWith('/api/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
         //   if (pathname.startsWith("/page2") && role !== "admin") {
           //     return Response.redirect(new URL('/', nextUrl));
          //  }
            return !!auth;
        },
  },
  providers: [
    Credentials({
      credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // if (email !== "mamun@gmail.com") {
          //   throw new Error("Invalid credentials.");
          // }

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
