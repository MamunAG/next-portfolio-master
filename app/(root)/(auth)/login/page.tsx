// "use server";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/sign-in";
import React from "react";
import { redirect } from "next/navigation";

export default async function Login(props: {
  params: {};
  searchParams: { redirectUrl: string };
}) {
  // const session = await auth();
  // if (session) {
  //   redirect("/admin");
  // }
  return (
    <>
      <SignIn />
    </>
  );
}
