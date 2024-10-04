import AdminHeader from "@/components/admin-header";
import AdminSidebar from "@/components/admin-sidebar";
import React from "react";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminHeader></AdminHeader>
      <div className="flex">
        <div className="md:w-1/6">
          <AdminSidebar></AdminSidebar>
        </div>
        <div className="md:w-5/6 z-30 p-10">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
