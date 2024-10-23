"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { BlogTable } from "@/app/(root)/admin/blogs/blog-table";
import { ReactQueryKey } from "@/utility/react-query-key";
import TableSkeleton from "@/utility/table-skeleton";
import { useToast } from "@/components/ui/use-toast";
import { PageAction } from "@/utility/page-actions";

function Blogs() {
  const { toast } = useToast();
  const {
    data: blogs,
    isError,
    error,
  } = useQuery({
    queryKey: [ReactQueryKey.blogs],
    queryFn: async () => (await axios.get("/api/blogs")).data,
  });

  if (isError) {
    console.log(error.message);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with the request.",
    });
    return null;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="font-bold text-2xl">Blogs</div>
        <div>
          <Link href={`blogs/${PageAction.add}`}>
            <Button>Add New Blog</Button>
          </Link>
        </div>
      </div>
      <div className=" mt-10">
        {blogs ? <BlogTable data={blogs} /> : <TableSkeleton />}
      </div>
    </div>
  );
}

export default Blogs;
