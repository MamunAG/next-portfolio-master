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
  if (Number.isNaN(id) || id == undefined || id == null || id <= 0) return null;

  const blog = await prismadb.blogMaster.findFirst({
    include: {
      BlogDetails: {
        orderBy: { sortingNo: "asc" },
      },
      BlogTags: { include: { tag: true } },
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
    throw new Error("Title is required");
  }
  if (!blogDetails) {
    throw new Error("Details is required");
  }

  var preBlogTitle = await prismadb.blogMaster.findFirst({
    where: {
      title: blogMaster.title,
    },
  });
  if (preBlogTitle) {
    throw new Error("This title already exist.");
  }

  //check unique title
  const preBlog = await prismadb.blogMaster.findFirst({
    where: {
      title: blogMaster.title,
    },
  });
  if (preBlog)
    throw new Error("This blog title already exist. Please try new one.");
  //end-check unique title

  const blog = await prismadb.blogMaster.create({
    data: {
      title: blogMaster.title,
      isPublished: blogMaster.isPublished,
      composedDate: blogMaster.composedDate,
    },
  });

  blogDetails?.forEach(async (element: BlogDetails) => {
    await prismadb.blogDetails.create({
      data: {
        masterId: blog.id,
        sectionType: element.sectionType,
        imagePreview: element.imagePreview,
        text: element.text,
        sortingNo: element.sortingNo,
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

export async function Update({
  blogMaster,
  blogDetails,
  blogTags,
}: {
  blogMaster: BlogMaster;
  blogDetails: BlogDetails[];
  blogTags: BlogTags[];
}) {
  if (!blogMaster.title) {
    throw new Error("Title is required");
  }
  if (!blogDetails) {
    throw new Error("Details is required");
  }
  if (Number.isNaN(blogMaster.id) || blogMaster.id <= 0) {
    throw new Error("Bad request. Request not consistent.");
  }

  var preBlogTitle = await prismadb.blogMaster.findFirst({
    where: {
      title: blogMaster.title,
      id: { not: Number(blogMaster.id) },
    },
  });

  if (preBlogTitle) {
    throw new Error("This title already exist.");
  }

  const blog = await prismadb.blogMaster.findFirst({
    where: { id: Number(blogMaster.id) },
  });
  if (!blog) {
    throw new Error("Blog is not found.");
  }

  const updatedBlog = await prismadb.blogMaster.update({
    data: {
      title: blogMaster.title,
      // composedById: blogMaster.composedById,
      composedDate: blogMaster.composedDate,
      isPublished: blogMaster.isPublished,
    },
    where: {
      id: Number(blogMaster.id),
    },
  });

  await prismadb.blogDetails.deleteMany({
    where: {
      masterId: Number(blogMaster.id),
    },
  });

  await prismadb.blogTags.deleteMany({
    where: {
      blogId: Number(blogMaster.id),
    },
  });

  await prismadb.blogDetails.createMany({
    data: blogDetails,
  });

  // blogDetails?.forEach(async (element: BlogDetails) => {
  //   await prismadb.blogDetails.createMany({
  //     data: {
  //       masterId: blogMaster.id,
  //       sectionType: element.sectionType,
  //       imagePreview: element.imagePreview,
  //       text: element.text,
  //       sortingNo: element.sortingNo,
  //     },
  //   });
  // });

  await prismadb.blogTags.createMany({
    data: blogTags,
  });

  // blogTags?.forEach(async (element: BlogTags) => {
  //   await prismadb.blogTags.create({
  //     data: {
  //       blogId: blogMaster.id,
  //       tagId: element.tagId,
  //     },
  //   });
  // });
  return updatedBlog;
}

export async function Delete(id: number) {
  if (Number(id) <= 0) {
    throw new Error("Bad request. Blog not selected.");
  }

  const blog = await prismadb.blogMaster.findFirst({
    where: { id: Number(id) },
  });

  if (!blog) {
    throw new Error("Bad request. Blog not found.");
  }

  await prismadb.blogDetails.deleteMany({
    where: {
      masterId: Number(id),
    },
  });

  await prismadb.blogTags.deleteMany({
    where: {
      blogId: Number(id),
    },
  });

  await prismadb.blogMaster.delete({
    where: {
      id: Number(id),
    },
  });

  return "Blog deleted successfully.";
}
