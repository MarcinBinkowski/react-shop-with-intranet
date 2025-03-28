import { type LayoutProps } from './types'
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ViewSwitcher } from "@/components/view-switcher"

interface BaseLayoutProps extends LayoutProps {
  icon: React.ReactNode
  title: string
//   navItems?: React.ReactNode
}

export function BaseLayout({ children, icon, title }: BaseLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  {icon}
                  <span className="text-base font-semibold">{title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        {/* {navItems} */}
        <ViewSwitcher />
      </Sidebar>
      {children}
    </SidebarProvider>
  )
}