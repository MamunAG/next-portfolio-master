"use server";

import prismadb from "@/lib/prismadb";
import { Tag } from "@prisma/client";

export async function Save(tag: Tag) {
  const { name, isActive } = tag;

  if (!name) {
    throw new Error("Name is required");
  }
  if (name.length < 2) {
    throw new Error("Tag name must be at least 2 character.");
  }

  var preTag = await prismadb.tag.findFirst({
    where: {
      name: name,
    },
  });
  if (preTag) {
    throw new Error("This tag already exist.");
  }

  return await prismadb.tag.create({
    data: {
      name,
      isActive,
    },
  });
}

export async function Update(tag: Tag) {
  const { id, name, isActive } = tag;

  if (Number(id) <= 0) {
    throw new Error("Tag not selected.");
  }
  if (Number(id) != Number(id)) {
    throw new Error("Bad request. Request not consistent.");
  }
  if (!name) {
    throw new Error("Name is required.");
  }

  return await prismadb.tag.update({
    data: {
      name,
      isActive,
    },
    where: {
      id: Number(id),
    },
  });
}

export async function Delete(id: number) {
  if (Number(id) <= 0) {
    throw new Error("Tag not selected.");
  }

  const tag = await prismadb.tag.findFirst({
    where: { id: Number(id) },
  });

  if (!tag) {
    throw new Error("Tag not found.");
  }
  return await prismadb.tag.delete({
    where: {
      id: Number(id),
    },
  });
}
