"use client";

import React from "react";
import { PageAction } from "@/utility/page-actions";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";
import axios from "axios";
import { Tag } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import BlogForm from "../blog-form";

export default function Crud({ params }: { params: { crud: string[] } }) {
  console.log(params);
  const pageAction = params.crud[0];
  const tagId = params.crud[1];

  const { data: tag } = useQuery({
    queryKey: [ReactQueryKey.tags, tagId],
    queryFn: async (): Promise<Tag> =>
      await axios.get(`/api/tag/${tagId}`).then((res) => res.data),
  });

  if (!pageAction) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Page Action type is required.</AlertDescription>
      </Alert>
    );
  }

  if (tagId && Number(tagId) > 0) {
    if (!tag) {
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
        <BlogForm data={tag} pageAction={PageAction.view} />
      </div>
    );
  } else if (pageAction === PageAction.add) {
    return (
      <div className="">
        <BlogForm data={tag} pageAction={PageAction.add} />
      </div>
    );
  } else if (pageAction === PageAction.edit) {
    return (
      <div>
        <BlogForm data={tag} pageAction={PageAction.edit} />
      </div>
    );
  } else if (pageAction === PageAction.delete) {
    return (
      <div>
        <BlogForm data={tag} pageAction={PageAction.delete} />
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
