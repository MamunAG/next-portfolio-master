// authors.ts
import prismadb from "@/lib/prismadb";
import { BlogDetails, BlogTags } from "@prisma/client";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
// app.use("/api/*", cors());

app.get("/", async (c) => {
  const blog = await prismadb.blogMaster.findMany();
  return c.json(blog);
});
// {
//   include: {
//     BlogDetails: true,
//     BlogTags: {
//       include: {
//         tag: true,
//       },
//     },
//   },
// }
app.get("/:id", async (c) => {
  const { id } = await c.req.param();
  if (!id) {
    throw new HTTPException(400, {
      message: "Blog not selected.",
    });
  }

  const blog = await prismadb.blogMaster.findFirst({
    include: {
      BlogDetails: true,
      BlogTags: {
        include: {
          tag: true,
        },
      },
    },
    where: { id: Number(id) },
  });

  if (!blog) {
    throw new HTTPException(400, { message: "Blog not found." });
  }

  return c.json(blog);
});

app.post("/", async (c) => {
  const {
    id,
    title,
    composedById,
    composedDate,
    isPublished,
    BlogDetails,
    BlogTags,
  } = await c.req.json();

  if (!title) {
    throw new HTTPException(400, { message: "Title is required" });
  }
  if (!BlogDetails) {
    throw new HTTPException(400, { message: "Details is required" });
  }

  const blog = await prismadb.blogMaster.create({
    data: {
      title,
      composedById,
      composedDate,
      isPublished,
    },
  });

  BlogDetails?.forEach(async (element: BlogDetails) => {
    await prismadb.blogDetails.create({
      data: {
        masterId: blog.id,
        sectionType: element.sectionType,
        imagePreview: element.imagePreview,
        text: element.text,
      },
    });
  });

  BlogTags?.forEach(async (element: BlogTags) => {
    await prismadb.blogTags.create({
      data: {
        blogId: blog.id,
        tagId: element.tagId,
      },
    });
  });

  const newBlog = await prismadb.blogMaster.findFirst({
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

  return c.json(newBlog);
});

app.post("/update/:id", async (c) => {
  const { id: paramId } = await c.req.param();
  const {
    id,
    title,
    composedById,
    composedDate,
    isPublished,
    BlogDetails,
    BlogTags,
  } = await c.req.json();

  if (!title) {
    throw new HTTPException(400, { message: "Title is required" });
  }
  if (!BlogDetails) {
    throw new HTTPException(400, { message: "Details is required" });
  }
  if (Number(paramId) != Number(id)) {
    throw new HTTPException(400, {
      message: "Bad request. Request not consistent.",
    });
  }

  const blog = await prismadb.blogMaster.findFirst({
    where: { id: Number(paramId) },
  });
  if (!blog) {
    throw new HTTPException(400, {
      message: "Blog is not found.",
    });
  }
  const updatedBlog = await prismadb.blogMaster.update({
    data: {
      title,
      composedById,
      composedDate,
      isPublished,
    },
    where: {
      id: Number(paramId),
    },
  });

  await prismadb.blogDetails.deleteMany({
    where: {
      masterId: Number(paramId),
    },
  });

  await prismadb.blogTags.deleteMany({
    where: {
      blogId: Number(paramId),
    },
  });

  BlogDetails?.forEach(async (element: BlogDetails) => {
    await prismadb.blogDetails.create({
      data: {
        masterId: blog.id,
        sectionType: element.sectionType,
        imagePreview: element.imagePreview,
        text: element.text,
      },
    });
  });

  BlogTags?.forEach(async (element: BlogTags) => {
    await prismadb.blogTags.create({
      data: {
        blogId: blog.id,
        tagId: element.tagId,
      },
    });
  });

  return c.json(updatedBlog);
});

app.post("/delete/:id", async (c) => {
  const { id: paramId } = await c.req.param();
  if (Number(paramId) <= 0) {
    throw new HTTPException(400, {
      message: "Bad request. Blog not selected.",
    });
  }
  const store = await prismadb.blogMaster.findFirst({
    where: { id: Number(paramId) },
  });
  if (!store) {
    return c.notFound();
  }

  await prismadb.blogDetails.deleteMany({
    where: {
      masterId: Number(paramId),
    },
  });

  await prismadb.blogTags.deleteMany({
    where: {
      blogId: Number(paramId),
    },
  });

  await prismadb.blogMaster.delete({
    where: {
      id: Number(paramId),
    },
  });

  return c.text("Blog deleted successfully.");
});

export default app;
