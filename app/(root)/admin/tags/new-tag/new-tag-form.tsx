"use client";

import { Tag } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Save } from "@/actions/tag-actions";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  isActive: z.boolean().default(false),
});

export default function NewTagForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: (tag: Tag) => Save(tag),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKey.tags],
      });
      route.push("/admin/tags");
    },
    onError: (err) => {
      console.log(err.message);
    },
    // throwOnError: true,
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    var data: Tag = {
      id: 0,
      name: values.name,
      isActive: values.isActive,
    };

    // Save(data);
    mutation.mutate(data);
    console.log(values);
  }

  let errorMessage: string = "";
  if (mutation.isError) {
    errorMessage = mutation.error.message;
  }

  return (
    <Form {...form}>
      <Alert
        variant="destructive"
        className={mutation.isError ? "visible" : "hidden"}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>
                This is the dispaly name of the tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Active?</FormLabel>
                <FormDescription>
                  If this field is not checked/active then tag will not show in
                  other pages.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-24"
            >
              Submit
            </Button>
            <Button
              type="reset"
              disabled={mutation.isPending}
              onClick={() => form.reset()}
              variant={"destructive"}
              className="w-24"
            >
              Cancel
            </Button>
          </div>
          <Button
            type="reset"
            disabled={mutation.isPending}
            onClick={() => route.push("/admin/tags")}
            variant={"outline"}
            className="w-24"
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
