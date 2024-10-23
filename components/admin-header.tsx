import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

function AdminHeader() {
  return (
    <nav
      className="sticky z-40 top-0 w-full flex flex-1 items-center justify-between p-2 border-b-2
     bg-gray-300 bg-opacity-50 backdrop-blur-sm
    "
    >
      <SidebarTrigger />
      <div className="w-5/6">
        <div className="flex align-items-center justify-between">
          <div></div>
          <div>
            <h1 className=" px-16">Admin User</h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
