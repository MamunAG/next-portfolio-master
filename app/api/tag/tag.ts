// authors.ts
import prismadb from "@/lib/prismadb";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();
8;

app.get("/", async (c) => {
  const tag = await prismadb.tag.findMany();
  return c.json(tag);
});

app.get("/:id", async (c) => {
  const { id } = await c.req.param();
  if (!id) {
    throw new HTTPException(400, {
      message: "Tag not selected.",
    });
  }

  const tag = await prismadb.tag.findFirst({
    where: { id: Number(id) },
  });

  if (!tag) {
    throw new HTTPException(400, { message: "Tag not found." });
  }

  return c.json(tag);
});

app.post("/", async (c) => {
  const { name, description, isActive } = await c.req.json();

  if (!name) {
    throw new HTTPException(400, { message: "Name is required" });
  }

  const store = await prismadb.tag.create({
    data: {
      name,
      isActive,
    },
  });

  return c.json(store);
});

app.post("/update/:id", async (c) => {
  const { id: paramId } = await c.req.param();
  const { id, name, isActive } = await c.req.json();

  if (Number(paramId) <= 0) {
    throw new HTTPException(400, {
      message: "Bad request. Tag not selected.",
    });
  }
  if (Number(paramId) != Number(id)) {
    throw new HTTPException(400, {
      message: "Bad request. Request not consistent.",
    });
  }
  if (!name) {
    throw new HTTPException(400, {
      message: "Bad request. Name is required.",
    });
  }
  const tag = await prismadb.tag.findFirst({
    where: { id: Number(paramId) },
  });
  if (!tag) {
    throw new HTTPException(400, {
      message: "Tag is not found.",
    });
  }
  const updatedTag = await prismadb.tag.update({
    data: {
      name,
      isActive,
    },
    where: {
      id: Number(paramId),
    },
  });
  return c.json(updatedTag);
});

app.post("/delete/:id", async (c) => {
  const { id: paramId } = await c.req.param();
  if (Number(paramId) <= 0) {
    throw new HTTPException(400, {
      message: "Bad request. Tag not selected.",
    });
  }
  const store = await prismadb.tag.findFirst({
    where: { id: Number(paramId) },
  });
  if (!store) {
    return c.notFound();
  }
  const upTag = await prismadb.tag.delete({
    where: {
      id: Number(paramId),
    },
  });

  return c.text("Tag deleted successfully.");
});

export default app;
