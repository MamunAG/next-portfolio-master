"use client";
import * as React from "react";
import BlogCard from "./blog-card";
import { GetAllBlog, GetAllBlogWithFirstDetails } from "@/actions/blog-actions";
import { BlogDetails, BlogMaster, BlogTags } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";

export default function Blogs() {
  const {
    data: blogs,
    isError,
    error,
  } = useQuery({
    queryKey: [ReactQueryKey.blogsView],
    queryFn: async () => await GetAllBlogWithFirstDetails(),
  });

  console.log(blogs);
  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-col py-5 lg:py-10 lg:mt-5 lg:px-20">
      {blogs?.map((b) => (
        <BlogCard blog={b} key={Math.random()} />
      ))}
    </div>
  );
}
