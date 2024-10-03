"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { BlogMaster } from "@prisma/client";
import Link from "next/link";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { BlogTable } from "@/app/(root)/admin/blogs/blog-table";

function AdminBlog() {
  const [blogs, setBlogs] = useState<BlogMaster[]>([]);
  useEffect(() => {
    async function getData() {
      await axios
        .get("/api/blogs")
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    }
    getData();
  }, []);
  return (
    <div className="container p-3">
      <div className="flex items-center justify-between border-b pb-2">
        <div>Blogs</div>
        <div>
          <Link href="blogs/add-new-blog">
            <Button>Add New Blog</Button>
          </Link>
        </div>
      </div>
      <div className="container">
        {/* {blogs.map((blog) => (
          <div key={blog.id}>
            <p>Title: {blog.title} </p>
            <p>Status: {blog.isPublished ? "Published" : "Not Published"} </p>
          </div>
        ))} */}
        {blogs ? <BlogTable blogs={blogs} /> : null}
      </div>
    </div>
  );
}

export default AdminBlog;
