"use client";

import React from "react";
import Image from "next/image";
import { CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function BlogCard({ blog }: { blog: BlogWithFirstDetailsDto }) {
  const route = useRouter();
  return (
    <div
      className="border rounded-lg shadow w-full p-5 mb-10 hover:cursor-pointer hover:border-slate-400 hover:shadow-lg transition"
      onClick={() => route.push(`/blogs/details?id=${blog?.id}`)}
    >
      <div className="w-full h-full flex flex-col sm:flex-row justify-center items-center">
        <div className="mb-3">
          <Image
            // src={"/images/vat.jpg"}
            src={blog?.firstImageUrl!}
            alt={"image"}
            width={110}
            height={110}
            className="border rounded-lg"
          />
        </div>
        <div className="flex-1 pl-5">
          <CardTitle className="mb-3 leading-6">{blog?.title}</CardTitle>
          <div
            className="ProseMirror sm:line-clamp-3 hidden sm:block"
            dangerouslySetInnerHTML={{ __html: blog?.firstDetails! }}
          />

          {/* <p>{blog?.firstDetails}</p> */}
        </div>
      </div>
    </div>
  );
}
