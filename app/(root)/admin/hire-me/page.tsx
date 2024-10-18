"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import TableSkeleton from "@/utility/table-skeleton";
import { useToast } from "@/components/ui/use-toast";
import { PageAction } from "@/utility/page-actions";
import { HireMeTable } from "./hire-me-table";
import { GetAllRequest } from "@/actions/hire-me-actions";
import { HireMe } from "@prisma/client";
import { error } from "console";

export default function HireMePage() {
  const { toast } = useToast();
  const [data, setData] = React.useState<HireMe[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [msg, setMsg] = React.useState<string>("");

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const reqs = await GetAllRequest();
        setData(reqs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setMsg("Some error happened. Please refresh the page.");
      }
    };
    getData();
  }, []);

  if (isError) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: msg,
    });
    return null;
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="font-bold text-2xl">Hire-me Request</div>
        {/* <div>
          <Link href={`tags/${PageAction.add}`}>
            <Button>Add New Tag</Button>
          </Link>
        </div> */}
      </div>
      <div className="container mt-10">
        {isLoading ? <TableSkeleton /> : <HireMeTable data={data!} />}
      </div>
    </div>
  );
}
