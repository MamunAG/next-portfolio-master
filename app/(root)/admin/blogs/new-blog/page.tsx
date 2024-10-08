"use client";

import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { FiFileText, FiImage } from "react-icons/fi";
import Link from "next/link";
import { Tag } from "@prisma/client";
import { v4 as uid } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import TextSection from "./components/client/text-section";
import ImageSection from "./components/client/image-section";
import AppSheet from "@/components/app-sheet";
import { AppCombobox } from "@/components/app-combobox";
import MultipleSelector from "@/components/MultipleSelectorRef";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utility/react-query-key";

function AddNewBlog() {
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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  // console.log(sections);

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

  console.log("lstT: ", TAG_OPTIONS);
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
    setSections(newSections);
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

  function handleSubmit() {
    // console.log("title: ", title);
    // console.log("tags: ", tags);
    // console.log(sections);

    const formattedData = {
      title,
      BlogTags: tags,
      BlogDetails: sections
    }
    axios.post("http://localhost:3000/api/blogs", formattedData).then(res => 
    {
      console.log(res);
      setSections([]);
    }
  ).catch(error => console.log(error));

  }
  type TagOption = {
    label: string;
    value: string;
  };

  if (isLoading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }
  return (
    <div>
      <AppSheet />
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
      <div className="text-left mt-10">
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={sections.length > 0 ? false : true}
          className="w-52"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default AddNewBlog;
