"use server";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/signout-button";
import React from "react";
import { redirect } from "next/navigation";

export default async function Login(props: {
  params: {};
  searchParams: { redirectUrl: string };
}) {
  const session = await auth();
  if (session && props.searchParams.redirectUrl != "login") {
    if (props.searchParams.redirectUrl) {
      redirect(props.searchParams.redirectUrl);
    } else {
      redirect("/admin");
    }
  }
  return (
    <>
      <SignIn redirectUrl="/blogs" />
    </>
  );
}
