"use server";

import { User } from "next-auth";
import { prisma } from "@/prisma";

export async function getUserFromDb(
  email: string,
  pwHash: string
): Promise<User | null> {
  // return await prisma.user.findFirst({
  //   where: { email, password: pwHash },
  // });
  return await prisma.user.findFirst();
}
