import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PageConfig } from "next";
import books from "@/app/api/books/books";
import authors from "@/app/api/authors/authors";
import user from "@/app/api/users/user";
import tag from "../tag/tag";
import blogs from "../blogs/blogs";
import { cors } from "hono/cors";

// export const config: PageConfig = {
//   api: {
//     bodyParser: false,
//   },
// };

const app = new Hono().basePath("/api");

app
  .route("/authors", authors)
  .route("/books", books)
  .route("/user", user)
  .route("/tag", tag)
  .route("/blogs", blogs);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
