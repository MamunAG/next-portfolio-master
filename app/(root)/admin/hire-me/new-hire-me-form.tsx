"use client";

import { HireMe } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ReactQueryKey } from "@/utility/react-query-key";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { PageAction } from "@/utility/page-actions";
import { cn } from "@/lib/utils";
import { Delete, Save, Update } from "@/actions/hire-me-actions";
import { Label } from "@/components/ui/label";
import moment from "moment";

const formSchema = z.object({
  id: z.number().default(0),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  isActive: z.boolean().default(true),
});

export default function NewHireMeForm({
  data,
  pageAction,
}: {
  data: HireMe | undefined;
  pageAction: string;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const route = useRouter();

  console.log("hireme: ", data);

  const mutation = useMutation({
    mutationFn: (hireme: HireMe) => {
      if (pageAction === PageAction.add) {
        return Save(hireme);
      } else if (pageAction === PageAction.edit) {
        return Update(hireme);
      } else if (pageAction === PageAction.delete) {
        return Delete(hireme.id);
      } else {
        throw new Error("Page Action no found.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.hireme],
      });
      route.push("/admin/hiremes");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }
  async function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (data) {
      await Delete(data.id);
      route.push("/admin/hire-me");
    }
  }

  return (
    <div className="flex gap-3 flex-col">
      <div className="grid grid-cols-4 gap-4">
        <Label className="font-bold ">Request Date:</Label>
        <Label className="col-span-3">
          {moment(data?.createdDate).format("DD-MMM-YYYY")}
        </Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Label className="font-bold ">Name:</Label>
        <Label className="col-span-3">{data?.name}</Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Label className="font-bold">Email:</Label>
        <Label className="col-span-3">{data?.email}</Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Label className="font-bold">Contact:</Label>
        <Label className="col-span-3">{data?.contact}</Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Label className="font-bold">Address:</Label>
        <Label className="col-span-3">{data?.address}</Label>
      </div>
      <div className="flex justify-between mt-7">
        <div className="flex gap-2">
          <Button
            type="button"
            disabled={mutation.isPending}
            className={cn(
              "w-24",
              pageAction == PageAction.view ? "hidden" : " "
            )}
            variant={
              pageAction == PageAction.delete ? "destructive" : "default"
            }
            onClick={onSubmit}
          >
            {pageAction == PageAction.add
              ? "Save"
              : pageAction == PageAction.edit
              ? "Update"
              : "Delete"}
          </Button>
          {/* <Button
            type="reset"
            disabled={mutation.isPending}
            onClick={() => {
              form.reset();
              form.clearErrors();
            }}
            variant={"destructive"}
            className={cn(
              "w-24",
              pageAction == PageAction.view ? "hidden" : "",
              pageAction == PageAction.delete ? "hidden" : ""
            )}
          >
            Cancel
          </Button> */}
        </div>
        <Button
          type="reset"
          disabled={mutation.isPending}
          onClick={() => route.push("/admin/hire-me")}
          variant={"outline"}
          className={cn("w-24")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
