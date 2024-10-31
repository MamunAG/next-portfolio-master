"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function SignInServerAction(formData: any) {
  try {
    await signIn("credentials", formData);
    redirect("/admin");
  } catch (error) {
    console.log(error);
  }
}

export async function SignOutServerAction() {
  return await signOut({ redirectTo: "/login", redirect: true });
}
