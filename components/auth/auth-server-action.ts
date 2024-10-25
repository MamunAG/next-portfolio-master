"use server";

import { signIn, signOut } from "@/auth";

export async function SignInServerAction(formData: any) {
  return await signIn("credentials", formData);
}

export async function SignOutServerAction() {
  return await signOut({ redirectTo: "/login", redirect: true });
}
