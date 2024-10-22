"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import ImageSection from "./components/image-section";
import TextSection from "./components/text-section";
import { FiFileText, FiImage } from "react-icons/fi";
import MultipleSelector from "@/components/MultipleSelectorRef";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Delete, Save, Update } from "@/actions/blog-actions";
import { v4 as uid } from "uuid";
import { BlogDetails, BlogMaster, BlogTags, Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";
import axios from "axios";
import { PageAction } from "@/utility/page-actions";
import { cn } from "@/lib/utils";

type TagOption = {
  label: string;
  value: string;
};

export default function BlogForm({
  data,
  pageAction,
}: {
  data:
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
    | null;
  pageAction: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  interface ISection {
    id: string;
    sectionType: string;
    imagePreview?: string | ArrayBuffer | null;
    text?: string;
  }

  const [title, setTitle] = React.useState<string>();
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const [TAG_OPTIONS, setTAG_OPTIONS] = React.useState<TagOption[]>([]);
  const [sections, setSections] = React.useState<ISection[]>([]);
  const [isProgress, setIsProgress] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const {
    data: tagsData,
    isError: tagIsError,
    error: tagError,
  } = useQuery({
    queryKey: [ReactQueryKey.tags],
    queryFn: async (): Promise<Tag[]> => (await axios.get("/api/tag")).data,
  });

  React.useEffect(() => {
    setIsLoading(true);
    const lstT: TagOption[] = [];
    setTAG_OPTIONS([]);
    tagsData?.forEach((element) => {
      lstT.push({
        label: element.name,
        value: element.id.toString(),
      });
    });
    setTAG_OPTIONS([...lstT]);
    setIsLoading(false);
  }, [tagsData]);

  React.useEffect(() => {
    //title
    setTitle(data?.title);

    //tags
    const tgs: TagOption[] = [];
    data?.BlogTags.forEach((element) => {
      tgs.push({
        label: element?.tag?.name!,
        value: element?.tagId.toString(),
      });
    });
    if (tgs) {
      setTags([...tgs]);
    }
    //end-tags

    //section
    const secs: ISection[] = [];
    data?.BlogDetails?.forEach((element) => {
      secs.push({
        id: element.id.toString(),
        sectionType: element.sectionType,
        imagePreview: element.imagePreview,
        text: element.text!,
      });
    });
    setSections([...secs]);
    //end-section
  }, [data]);

  const addNewSection = (type: string) => {
    if (type == "text") {
      const newSection = {
        id: uid(),
        sectionType: "text",
      };
      setSections((sections) => [...sections, newSection]);
    } else {
      const newSection = {
        id: uid(),
        sectionType: "image",
        imagePreview: null,
      };
      setSections((sections) => [...sections, newSection]);
    }
  };

  const removeSection = (id: string) => {
    setSections((sections) => sections.filter((section) => section.id != id));
  };

  const moveSection = (id: string, direction: number) => {
    const index = sections.findIndex((section) => section.id === id);
    if (index < 0) return;
    const newSections = [...sections];
    const [movedSection] = newSections.splice(index, 1);
    newSections.splice(index + direction, 0, movedSection);
    setSections([...newSections]);
  };

  const handleInputChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, text: e.target.value } : section
      )
    );
  };

  const handleImageChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setSections((prevSections) =>
            prevSections.map((section) =>
              section.id === id
                ? { ...section, imagePreview: reader.result }
                : section
            )
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setIsProgress(true);

      const blogMasterData: BlogMaster = {
        id: data?.id!,
        title: title!,
        isPublished: true,
        composedById: 0,
        composedDate: new Date(),
      };

      const blogDetailsData: BlogDetails[] = sections.map((element, index) => {
        const dtls: BlogDetails = {
          id: 0,
          masterId: 0,
          sectionType: element.sectionType,
          imagePreview: element.imagePreview?.toString()!,
          text: element.text!,
          sortingNo: index,
        };
        return dtls;
      });

      const blogTagsData: BlogTags[] = tags.map((element) => {
        const t: BlogTags = {
          id: 0,
          blogId: 0,
          tagId: Number(element.value),
        };
        return t;
      });

      console.log("master: ", blogMasterData);
      console.log("details: ", blogDetailsData);
      console.log("tags: ", blogTagsData);

      if (pageAction === PageAction.add) {
        await Save({
          blogMaster: blogMasterData,
          blogDetails: blogDetailsData,
          blogTags: blogTagsData,
        });
        toast({
          variant: "success",
          description: "New blog post added successfully.",
        });
      } else if (pageAction === PageAction.edit) {
        await Update({
          blogMaster: blogMasterData,
          blogDetails: blogDetailsData,
          blogTags: blogTagsData,
        });
        toast({
          variant: "success",
          description: "Blog post updated successfully.",
        });
      } else if (pageAction === PageAction.delete) {
        await Delete(blogMasterData.id);
        toast({
          variant: "success",
          description: "Blog post deleted successfully.",
        });
      }

      router.push("/admin/blogs");
    } catch (error) {
      setIsProgress(false);
      console.log("Error: ", error);
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
      }
    }
  }

  console.log("view data:", sections);

  if (isLoading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center">
          <Link
            className="underline hover:underline-green-300 hover:text-green-500"
            href="/admin/blogs"
          >
            Blogs
          </Link>
          <FaAngleRight></FaAngleRight>
          <p>Adding New Blog</p>
        </div>
        <div></div>
      </div>
      <div className="mt-3 border-b pb-2">
        <div className="flex items-center justify-between">
          <table className="flex-auto">
            <tbody>
              <tr>
                <th className="p-1 w-6">
                  <Label>Title</Label>
                </th>
                <th className="p-1 w-6">
                  <Input
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                </th>
              </tr>
              <tr>
                <th className="p-1">
                  <Label>Tag</Label>
                </th>
                <th className="p-1">
                  <MultipleSelector
                    value={tags}
                    onChange={setTags}
                    options={TAG_OPTIONS}
                    badgeClassName="bg-slate-100 text-black border hover:bg-slate-200"
                    placeholder="Select tag..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </th>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th className="p-1">
                  <Button
                    onClick={() => addNewSection("text")}
                    variant="outline"
                    className="w-full"
                  >
                    <FiFileText className="mr-1"></FiFileText> Add text section
                  </Button>
                </th>
              </tr>
              <tr>
                <th className="p-1">
                  <Button
                    onClick={() => addNewSection("image")}
                    variant="outline"
                    className="w-full"
                  >
                    <FiImage className="mr-1"></FiImage> Add image section
                  </Button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {sections.map((section) =>
          section.sectionType == "text" ? (
            <TextSection
              onMoveUp={() => moveSection(section.id, -1)}
              onMoveDown={() => moveSection(section.id, 1)}
              section={section}
              onRemove={() => removeSection(section.id)}
              onInputChange={handleInputChange}
              key={section.id.toString()}
            ></TextSection>
          ) : (
            <ImageSection
              key={section.id}
              section={section}
              onImageChange={handleImageChange}
              onMoveUp={() => moveSection(section.id, -1)}
              onMoveDown={() => moveSection(section.id, 1)}
              onRemove={() => removeSection(section.id)}
            ></ImageSection>
          )
        )}
      </div>

      <div className="flex justify-between mt-10">
        <div className="flex gap-2">
          <Button
            disabled={sections.length > 0 ? isProgress : true}
            className={cn(
              "w-24",
              pageAction == PageAction.view ? "hidden" : " "
            )}
            variant={
              pageAction == PageAction.delete ? "destructive" : "default"
            }
            onClick={handleSubmit}
          >
            {pageAction == PageAction.add
              ? "Save"
              : pageAction == PageAction.edit
              ? "Update"
              : "Delete"}
          </Button>
          <Button
            type="reset"
            disabled={sections.length > 0 ? isProgress : true}
            onClick={() => {
              setTitle("");
              setTags([]);
              setSections([]);
            }}
            variant={"destructive"}
            className={cn(
              "w-24",
              pageAction == PageAction.view ? "hidden" : "",
              pageAction == PageAction.delete ? "hidden" : ""
            )}
          >
            Cancel
          </Button>
        </div>
        <Button
          type="reset"
          disabled={sections.length > 0 ? isProgress : true}
          onClick={() => router.push("/admin/blogs")}
          variant={"outline"}
          className={cn("w-24")}
        >
          Back
        </Button>
      </div>
    </>
  );
}
