import Link from "next/link";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";
import { RxCheck } from "react-icons/rx";
import { FaBlog } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { TiHome } from "react-icons/ti";

function AdminSidebar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div className="w-1/6 h-lvh p-2 shadow-lg shadow-blue-500/40">
        <h1 className="text-center">Portfolio</h1>
        <div className="mt-3">
          <div>
            <Link
              href="/admin"
              className="flex items-center p-2 border-b hover:bg-slate-200 rounded"
            >
              <TiHome className="mr-3 size-4" /> Home
            </Link>
          </div>
          <div>
            <Link
              href="/admin/blogs"
              className="flex items-center p-2 border-b hover:bg-slate-200 rounded"
            >
              <FaBlog className="mr-3 size-4" /> Blogs
            </Link>
            <Link
              href="/admin/tags"
              className="flex items-center p-2 border-b hover:bg-slate-200 rounded"
            >
              <IoPricetags className="mr-3 size-4" /> Tag
            </Link>
          </div>
        </div>
      </div>
      <div className="w-5/6"></div>
    </div>
  );
}

export default AdminSidebar;
