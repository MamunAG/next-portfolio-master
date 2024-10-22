"use client";

import React, { useEffect } from "react";
import { PageAction } from "@/utility/page-actions";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import BlogForm from "../blog-form";
import { GetAllBlogById } from "@/actions/blog-actions";
import { BlogDetails, BlogMaster, BlogTags } from "@prisma/client";

export default function Crud({ params }: { params: { crud: string[] } }) {
  const [data, setData] = React.useState<
    | ({
        BlogDetails: BlogDetails[];
        BlogTags: ({
          tag: {
            name: string;
            id: number;
            isActive: boolean;
          } | null;
        } & {
          id: number;
          blogId: number;
          tagId: number;
        })[];
      } & BlogMaster)
    | null
  >();

  console.log(params);
  const pageAction = params.crud[0];
  const blogId = params.crud[1];

  useEffect(() => {
    const getData = async () => await GetAllBlogById(Number(blogId));
    getData().then((res) => setData(res));
  }, [blogId]);

  if (!pageAction) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Page Action type is required.</AlertDescription>
      </Alert>
    );
  }

  if (blogId && Number(blogId) > 0) {
    if (!data) {
      return (
        <h1>
          <em>Loading...</em>
        </h1>
      );
    }
  }

  if (pageAction === PageAction.view) {
    return (
      <div className="">
        <BlogForm data={data!} pageAction={PageAction.view} />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="">
        <BlogForm data={null} pageAction={PageAction.add} />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div>
        <BlogForm data={data!} pageAction={PageAction.edit} />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div>
        <BlogForm data={data!} pageAction={PageAction.delete} />
      </div>
    );
  } else {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Page Action type is required.</AlertDescription>
      </Alert>
    );
  }
}
