"use server";

import prismadb from "@/lib/prismadb";
import { Tag } from "@prisma/client";
import { error } from "console";

export async function Save(tag: Tag) {
  const { name, isActive } = tag;

  if (!name) {
    throw new Error("Name is required");
  }
  if (name.length < 2) {
    throw new Error("Tag name must be at least 2 character.");
  }
  return await prismadb.tag.create({
    data: {
      name,
      isActive,
    },
  });
}
