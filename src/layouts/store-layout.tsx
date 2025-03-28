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
    SidebarRail,
    SidebarTrigger,
  } from "@/components/ui/sidebar";
import { Button } from "../components/ui/button";
import {ArrowUpCircleIcon, Store} from "lucide-react";
import { ViewSwitcher } from "../components/view-switcher";
import { BaseLayout } from "./base-layout";
import { LayoutProps } from "./types";



const StoreLayout = ({ children }: LayoutProps) => {
    return (
      <BaseLayout 
        icon={<Store className="h-5 w-5" />}
        title="Shop"
        //   navItems={}
      >
        {children}
      </BaseLayout>
    )
  }
  
export default StoreLayout


