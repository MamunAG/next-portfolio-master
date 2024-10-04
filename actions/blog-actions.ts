"use server";

import prismadb from "@/lib/prismadb";

export async function GetAllBlog() {
  const blogs = await prismadb.blogMaster.findMany();
  return blogs;
}
