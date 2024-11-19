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
      onClick={() => route.push(`/blogs/${blog?.id}`)}
    >
      <div className="w-full h-full flex flex-row">
        <div>
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
          <CardTitle>{blog?.title}</CardTitle>
          <div
            className="ProseMirror"
            dangerouslySetInnerHTML={{ __html: blog?.firstDetails! }}
          />

          {/* <p>{blog?.firstDetails}</p> */}
        </div>
      </div>
    </div>
  );
}
