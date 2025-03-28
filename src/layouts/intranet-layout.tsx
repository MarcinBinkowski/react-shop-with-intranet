import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,

  } from "@/components/ui/sidebar";
import { Building2 } from "lucide-react";
import { BaseLayout } from "./base-layout";
import { LayoutProps } from "./types";


const IntranetLayout = ({children}: LayoutProps) => {
    return (
        <BaseLayout 
          icon={<Building2 className="h-5 w-5" />}
          title="Intranet"
        //   navItems={}
        >
          {children}
        </BaseLayout>
      )
}

export default IntranetLayout;