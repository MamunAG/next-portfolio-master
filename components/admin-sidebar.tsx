import Link from "next/link";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";

function AdminSidebar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div className="bg-teal-900 w-1/6 h-lvh p-2 shadow-lg shadow-blue-500/40 text-white">
        <h1 className="text-center">LOGO</h1>
        <div className="mt-2">
          <div className="border-b mb-1 p-1">
            <Link href="/admin" className="flex items-center">
              <FiSettings className="mr-1"></FiSettings> Settings
            </Link>
          </div>
          <div className="border-b mb-1 p-1">
            <Link href="/admin/blogs" className="flex items-center">
              <TfiWrite className="mr-1"></TfiWrite> Blogs
            </Link>
          </div>
        </div>
      </div>
      <div className="w-5/6"></div>
    </div>
  );
}

export default AdminSidebar;
