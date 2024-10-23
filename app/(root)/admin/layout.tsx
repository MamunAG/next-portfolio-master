import AdminHeader from "@/components/admin-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AdminHeader></AdminHeader>
        <div className="container flex flex-1 flex-col py-3">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout;
