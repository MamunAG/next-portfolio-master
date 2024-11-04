"use server";

import { signIn, signOut } from "@/auth";

export async function SignInServerAction(formData: any) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.log(error);
  }
}

export async function SignOutServerAction() {
  return await signOut({ redirectTo: "/api/auth/signin", redirect: true });
}
