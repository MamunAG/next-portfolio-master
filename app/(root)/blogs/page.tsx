import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "./blog-card";

export default function Blogs() {
  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-col py-5 lg:py-10 lg:mt-5 lg:px-20">
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
}
