"use server";

import prismadb from "@/lib/prismadb";
import { BlogDetails, BlogMaster, BlogTags } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export async function GetAllBlog() {
  const blogs = await prismadb.blogMaster.findMany({
    include: { BlogDetails: true },
  });
  return blogs;
}
export async function GetAllBlogById(id: number) {
  const blog = await prismadb.blogMaster.findFirst({
    include: {
      BlogDetails: {
        orderBy: { id: "asc" },
      },
      BlogTags: true,
    },
    where: { id: Number(id) },
  });
  return blog;
}
export async function GetAllBlogWithFirstDetails() {
  const blogs = await prismadb.blogMaster.findMany({
    include: { BlogDetails: true },
  });

  const data: BlogWithFirstDetailsDto[] = [];
  blogs?.forEach((element) => {
    let item: BlogWithFirstDetailsDto = {
      id: element.id,
      title: element.title,
      firstDetails: element.BlogDetails?.filter(
        (v, i) => v.sectionType === "text"
      )[0]?.text,
      firstImageUrl: element.BlogDetails?.filter(
        (v, i) => v.sectionType === "image"
      )[0]?.imagePreview,
    };

    data.push(item);
  });

  return data;
}

export async function Save({
  blogMaster,
  blogDetails,
  blogTags,
}: {
  blogMaster: BlogMaster;
  blogDetails: BlogDetails[];
  blogTags: BlogTags[];
}) {
  if (!blogMaster.title) {
    throw new HTTPException(400, { message: "Title is required" });
  }
  if (!blogDetails) {
    throw new HTTPException(400, { message: "Details is required" });
  }

  var preBlogTitle = await prismadb.blogMaster.findFirst({
    where: {
      title: blogMaster.title,
    },
  });
  if (preBlogTitle) {
    throw new Error("This title already exist.");
  }

  const blog = await prismadb.blogMaster.create({
    data: blogMaster,
  });

  blogDetails?.forEach(async (element: BlogDetails) => {
    await prismadb.blogDetails.create({
      data: {
        masterId: blog.id,
        sectionType: element.sectionType,
        imagePreview: element.imagePreview,
        text: element.text,
      },
    });
  });

  blogTags?.forEach(async (element: BlogTags) => {
    await prismadb.blogTags.create({
      data: {
        blogId: blog.id,
        tagId: element.tagId,
      },
    });
  });

  return await prismadb.blogMaster.findFirst({
    include: {
      BlogDetails: true,
      BlogTags: {
        include: {
          tag: true,
        },
      },
    },
    where: { id: blog.id },
  });
}
