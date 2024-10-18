"use client";
import { GetAllBlogById } from "@/actions/blog-actions";
import { BlogDetails, BlogMaster, BlogTags } from "@prisma/client";
import Image from "next/image";
import React from "react";

function ImageSection({ src }: { src: string }) {
  return (
    <div className="flex justify-center items-center">
      <Image src={src} alt="vat-text" height={300} width={300} />
    </div>
  );
}

function TextSection({ text }: { text: string }) {
  return (
    <div className="flex justify-center items-center mt-5">
      <p>{text}</p>
    </div>
  );
}

export default function Details({ params }: { params: { details: number } }) {
  const [blog, setBlog] = React.useState<
    | ({
        BlogDetails: BlogDetails[];
        BlogTags: BlogTags[];
      } & BlogMaster)
    | null
  >();

  React.useEffect(() => {
    const getData = async () => {
      const data = await GetAllBlogById(params.details);
      setBlog(data);
    };
    getData();
  }, [params.details]);

  console.log(blog);
  return (
    <div className="container flex flex-col justify-center">
      <div className="border-b-2 mb-3 pb-2">
        <h1 className="font-bold text-2xl">{blog?.title}</h1>
      </div>
      {blog?.BlogDetails?.map((element) =>
        element.sectionType === "image" ? (
          <ImageSection src={element.imagePreview!} key={Math.random()} />
        ) : (
          <TextSection text={element.text!} key={Math.random()} />
        )
      )}
    </div>
  );
}
