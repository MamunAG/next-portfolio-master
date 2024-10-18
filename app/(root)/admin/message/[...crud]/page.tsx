"use client";

import React from "react";
import { PageAction } from "@/utility/page-actions";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";
import axios from "axios";
import { HireMe, Tag } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import NewHireMeForm from "../new-hire-me-form";
import { GetRequestById } from "@/actions/hire-me-actions";
import { GetContactMessageById } from "@/actions/contact-message-actions";
import ContactMessageForm from "../new-hire-me-form";

export default function Crud({ params }: { params: { crud: string[] } }) {
  const pageAction = params.crud[0];
  const hireMeId = params.crud[1];

  const { data: hireMeData } = useQuery({
    queryKey: [ReactQueryKey.tags, hireMeId],
    queryFn: async () => GetContactMessageById(Number(hireMeId)),
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

  if (hireMeId && Number(hireMeId) > 0) {
    if (!hireMeData) {
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
        <div className="w-7/12 ">
          <ContactMessageForm data={hireMeData!} pageAction={PageAction.view} />
        </div>
      </div>
    );
  } else if (params.crud[0] === PageAction.add) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-7/12 ">
          {/* <NewHireMeForm data={hireMeData} pageAction={PageAction.add} /> */}
        </div>
      </div>
    );
  } else if (params.crud[0] === PageAction.edit) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-7/12 ">
          {/* <NewHireMeForm data={hireMeData} pageAction={PageAction.edit} /> */}
        </div>
      </div>
    );
  } else if (params.crud[0] === PageAction.delete) {
    return (
      <div className="flex justify-center items-center w-full ">
        <div className="w-7/12 ">
          <ContactMessageForm
            data={hireMeData!}
            pageAction={PageAction.delete}
          />
        </div>
      </div>
    );
  }
}
