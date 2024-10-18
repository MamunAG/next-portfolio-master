import * as React from "react";
import BlogCard from "./blog-card";

export default function Blogs() {
  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-col py-5 lg:py-10 lg:mt-5 lg:px-20">
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}
