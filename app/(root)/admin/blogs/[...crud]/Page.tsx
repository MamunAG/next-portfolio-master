"use client";

import React from "react";
import NewTagForm from "../new-tag-form";
import { PageAction } from "@/utility/page-actions";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";
import axios from "axios";
import { Tag } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

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

  if (params.crud[0] === PageAction.view) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-5/12 ">
          <NewTagForm data={tag} pageAction={PageAction.view} />
        </div>
      </div>
    );
  } else if (params.crud[0] === PageAction.add) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-5/12 ">
          <NewTagForm data={tag} pageAction={PageAction.add} />
        </div>
      </div>
    );
  } else if (params.crud[0] === PageAction.edit) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-5/12 ">
          <NewTagForm data={tag} pageAction={PageAction.edit} />
        </div>
      </div>
    );
  } else if (params.crud[0] === PageAction.delete) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-5/12 ">
          <NewTagForm data={tag} pageAction={PageAction.delete} />
        </div>
      </div>
    );
  }
}
