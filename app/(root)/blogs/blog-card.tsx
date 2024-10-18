"use client";

import React from "react";
import Image from "next/image";
import { CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function BlogCard() {
  const route = useRouter();
  return (
    <div
      className="border rounded-lg shadow w-full p-5 mb-10 hover:cursor-pointer hover:border-slate-400 hover:shadow-lg transition"
      onClick={() => route.push("/blogs/100")}
    >
      <div className="w-full h-full flex flex-row">
        <div>
          <Image
            src={"/images/vat.jpg"}
            alt={"image"}
            width={110}
            height={110}
            className="border rounded-lg"
          />
        </div>
        <div className="flex-1 pl-5">
          <CardTitle>Some blog title</CardTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            autem culpa praesentium consectetur quos reprehenderit quae
            corrupti? Adipisci, dolorem voluptatibus odio veniam harum
            distinctio aliquam fugiat soluta quam eum corporis. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Distinctio autem culpa
            praesentium consectetur quos reprehenderit quae corrupti? Adipisci,
            dolorem voluptatibus odio veniam harum distinctio aliquam fugiat
            soluta quam eum corporis....
          </p>
        </div>
      </div>
    </div>
  );
}
