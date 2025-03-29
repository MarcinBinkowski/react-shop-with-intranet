import { type LayoutProps } from './types'
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
  SidebarRail,
} from "@/components/ui/sidebar"
import { ViewSwitcher } from "@/components/view-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AppHeader } from "@/components/app-header"

interface BaseLayoutProps extends LayoutProps {
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

export function BaseLayout({ children, icon, title, navItems }: BaseLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r">
          <SidebarHeader className="px-4 py-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="flex items-center gap-2 rounded-lg bg-sidebar-primary p-2 text-sidebar-primary-foreground"
                >
                  <a href="#" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                      {icon}
                    </div>
                    <span className="text-base font-semibold">{title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <div className="mt-4 px-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 text-sm"
                />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2">
            {navItems && navItems.map((section, index) => (
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
              <ModeToggle />
            </div>
          </div>
          <SidebarRail />
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <AppHeader title={title} />
          <main className="p-6">
            {children || (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-medium">Welcome to {title}</h3>
                  <p className="text-muted-foreground">
                    This is a placeholder content area. Add your content here.
                  </p>
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
