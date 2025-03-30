import type React from "react"
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import { ViewSwitcher } from "@/components/view-switcher"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"
import { AppHeader } from "../components/header"

interface BaseLayoutProps {
  icon: React.ReactNode
  title: string
  navItems?: {
    title: string
    items: {
      name: string
      href: string
      icon: React.ReactNode
    }[]
  }[]
}

// This wrapper component allows us to access the sidebar context
const BaseLayoutContent = ({ icon, title, navItems }: BaseLayoutProps) => {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <Sidebar className="border-r" style={{ "--sidebar-width": "16rem" } as React.CSSProperties}>
        <SidebarHeader className="px-4 py-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="flex items-center gap-2 rounded-lg bg-primary/10 p-2">
                <a href="#" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">{icon}</div>
                  <span className="text-base font-semibold">{title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="mt-4 px-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 text-sm" />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          {navItems &&
            navItems.map((section, index) => (
              <SidebarGroup key={index}>
                <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton asChild className="flex items-center gap-2 px-2 py-1.5">
                          <a href={item.href} className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
        </SidebarContent>

        <div className="mt-auto px-4 py-4">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between">
            <ViewSwitcher />
          </div>
        </div>
      </Sidebar>

      <SidebarInset className="flex-1">
        <AppHeader title={title} onMenuClick={toggleSidebar} />
        <main className="p-6 max-w-7xl mx-auto w-full">{<Outlet />}</main>
      </SidebarInset>
    </div>
  )
}

// Main component that provides the sidebar context
export function BaseLayout(props: BaseLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <BaseLayoutContent {...props} />
    </SidebarProvider>
  )
}

