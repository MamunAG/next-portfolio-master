import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

import React from "react";

function AdminBlog() {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between border-b pb-2">
        <div>Blogs</div>
        <div>
          <Link href="blogs/add-new-blog">
            <Button>Add New Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminBlog;
