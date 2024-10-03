// user.ts
import prismadb from "@/lib/prismadb";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  var users = await prismadb.user.findMany();
  return c.json(users);
});

app.post("/", async (c) => {
  var user = await prismadb.user.create({
    data: {
      email: "someone2@yahoo.com",
      name: "someone2",
      password: "12345",
    },
  });
  return c.json(user);
});

app.get("/:id", async (c) => {
  const { id } = await c.req.param();
  const user = await prismadb.user.findFirst({
    where: { id: Number(id) },
  });
  return c.json(user);
});

export default app;
