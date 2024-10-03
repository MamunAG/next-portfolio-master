"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { map, z } from "zod";

import { Button } from "@/components/ui/button";

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
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@radix-ui/react-label";
import React, {
  EventHandler,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";

import {
  LuChevronDown,
  LuChevronDownCircle,
  LuChevronUp,
  LuChevronUpCircle,
  LuTrash2,
} from "react-icons/lu";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type masterDataType = {
  id: number;
  blogTitle: string;
  composedBy: string;
};

type detailsDataType = {
  id: number;
  masterId: number;
  text: string;
  imageName: string;
  isTextSection: boolean;
  isImageSection: boolean;
  sorting: number;
};

const initialMasterData: masterDataType = {
  id: 0,
  blogTitle: "",
  composedBy: "",
};

const initialDetailsData: detailsDataType[] = [
  {
    id: 0,
    masterId: 0,
    text: "",
    imageName: "",
    isTextSection: false,
    isImageSection: false,
    sorting: 0,
  },
];

export default function NewBlog() {
  const [masterData, setMasterData] = useState(initialMasterData);
  const [detailsData, setDetailsData] = useState<detailsDataType[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function navigateToUp(id: number) {
    var details = detailsData.map((x) => {
      if (x.id === id) {
        if (x.sorting - 1 > 0) {
          x.sorting = x.sorting - 1;
        }
      }
      return x;
    });
    details = details.sort((a, b) => a.sorting - b.sorting);

    alert(JSON.stringify(details));
    setDetailsData([...details]);
  }

  function UpDownNavigation({ details }: { details: detailsDataType }) {
    return (
      <div>
        <Button
          variant={"outline"}
          className="mr-1 w-24"
          onClick={() => navigateToUp(details.id)}
        >
          <LuChevronUpCircle className="mr-2 " />
          Up
        </Button>
        <Button variant={"outline"} className="mr-1 w-24">
          <LuChevronDownCircle className="mr-2" />
          Down
        </Button>
        <Button variant={"outline"} className="w-24 border-red-300 border">
          <LuTrash2 className="mr-2 text-red-700" />
          Delete
        </Button>
      </div>
    );
  }
  function GetNewSection({ details }: { details: detailsDataType }) {
    if (details.isTextSection == true) {
      return (
        <div className="flex flex-col mt-2 border p-2">
          <div className="flex justify-between">
            <Label htmlFor="picture">Text section</Label>
            <UpDownNavigation details={details} />
          </div>
          <Textarea className="mt-2" />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col mt-2 border p-2">
          <div className="flex justify-between">
            <Label htmlFor="picture">Image section</Label>
            <UpDownNavigation details={details} />
          </div>
          <div className="flex justify-center items-center">
            <div className="w-40 h-40 border">Image preview</div>
          </div>
          <Input id="picture" type="file" className="" />
        </div>
      );
    }
  }

  function handleAddTextSection(event: MouseEvent<HTMLElement>) {
    event.preventDefault();

    var texts = detailsData;
    var data: detailsDataType = {
      id: detailsData.length + 1,
      masterId: 0,
      text: initialDetailsData[0].text,
      imageName: "",
      isTextSection: true,
      isImageSection: false,
      sorting: detailsData.length + 1,
    };

    texts.push(data);
    setDetailsData([...texts]);
  }

  function handleAddImageSection(event: MouseEvent<HTMLElement>) {
    event.preventDefault();

    var texts = detailsData;
    var data: detailsDataType = {
      id: detailsData.length + 1,
      masterId: 0,
      text: initialDetailsData[0].text,
      imageName: "",
      isTextSection: false,
      isImageSection: true,
      sorting: detailsData.length + 1,
    };

    texts.push(data);
    setDetailsData([...texts]);
  }

  return (
    <div className="container">
      {/* Action */}
      <div className="flex flex-col">
        <div className="flex justify-between flex-wrap">
          <div className="flex justify-start flex-col space-x-2 w-48">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default">Publish this post</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <Label className="">This post is not published yet.</Label>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-2">
            <Button
              variant={"default"}
              className="w-48"
              onClick={handleAddTextSection}
            >
              Add new text section
            </Button>
            <Button
              variant={"default"}
              className="w-48"
              onClick={handleAddImageSection}
            >
              Add new image section
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <Label>Blog Title*</Label>
          <Input />
        </div>
      </div>
      {/*end Action */}

      {/* new blog entry */}
      <div className="flex flex-col mt-2">
        {detailsData.map((x) => (
          <GetNewSection details={x} key={Math.random()} />
        ))}
      </div>
      {/* end new blog entry */}
    </div>
  );
}
