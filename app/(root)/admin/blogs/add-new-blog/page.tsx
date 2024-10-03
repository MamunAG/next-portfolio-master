"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { FiFileText, FiImage } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TextSection from "./components/client/text-section";
import { v4 as uid } from "uuid";
import ImageSection from "./components/client/image-section";
function AddNewBlog() {
  interface ISection {
    id: string;
    sectionType: string;
    imagePreview?: string | ArrayBuffer | null;
    text?: string;
  }
  const [sections, setSections] = useState<ISection[]>([]);

  console.log(sections);

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

  return (
    <div className="p-3">
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
          <table>
            <tbody>
              <tr>
                <th className="p-1">
                  <Label>Title</Label>
                </th>
                <th className="p-1">
                  <Input name="title" placeholder="Title"></Input>
                </th>
              </tr>
              <tr>
                <th className="p-1">
                  <Label>Tag</Label>
                </th>
                <th className="p-1">
                  <Input name="tag" placeholder="Tag"></Input>
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
      <div className="mt-3 text-center">
        {sections.length > 0 ? <Button variant="default">Save</Button> : ""}
      </div>
    </div>
  );
}

export default AddNewBlog;
