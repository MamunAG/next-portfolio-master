"use client";

import React, { useEffect, useState } from "react";
import TableSkeleton from "@/utility/table-skeleton";
import { useToast } from "@/components/ui/use-toast";
import { ContactMessage } from "@prisma/client";
import { GetAllContactMessage } from "@/actions/contact-message-actions";
import { ContactMessageTable } from "./contact-message-table";

export default function MessagePage() {
  const { toast } = useToast();
  const [data, setData] = React.useState<ContactMessage[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [msg, setMsg] = React.useState<string>("");

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const msgs = await GetAllContactMessage();
        setData(msgs);
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
    <div className="">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="font-bold text-2xl">Contact Message</div>
        {/* <div>
          <Link href={`tags/${PageAction.add}`}>
            <Button>Add New Tag</Button>
          </Link>
        </div> */}
      </div>
      <div className=" mt-10">
        {isLoading ? <TableSkeleton /> : <ContactMessageTable data={data!} />}
      </div>
    </div>
  );
}
