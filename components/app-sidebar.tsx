import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MessageCircle,
  LucideGitPullRequest,
  Tag,
  PaintbrushVerticalIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Blog",
    url: "/admin/blogs",
    icon: Inbox,
  },
  {
    title: "Tag",
    url: "/admin/tags",
    icon: Tag,
  },
  {
    title: "Hire-me Request",
    url: "/admin/hire-me",
    icon: LucideGitPullRequest,
  },
  {
    title: "Contact Message",
    url: "/admin/message",
    icon: MessageCircle,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
