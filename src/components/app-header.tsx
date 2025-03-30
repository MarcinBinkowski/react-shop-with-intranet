"use client"

import { Bell, Search, Menu, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

interface AppHeaderProps {
  title: string
  showSearch?: boolean
  onMenuClick?: () => void
}

export function AppHeader({ title, showSearch = true, onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>

      {showSearch && (
        <div className="hidden md:block md:flex-1 md:px-6 lg:px-8 xl:max-w-3xl xl:mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, orders, customers..."
              className="w-full bg-background pl-8 pr-4 focus-visible:ring-primary"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 md:gap-4">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </span>
              <span className="sr-only">Messages</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Messages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { name: "John Doe", message: "New order placed #1234", time: "2m ago" },
              { name: "Sarah Smith", message: "Your report is ready", time: "1h ago" },
              { name: "Team Support", message: "Meeting scheduled for tomorrow", time: "5h ago" },
            ].map((item, i) => (
              <DropdownMenuItem key={i} className="cursor-pointer p-0">
                <div className="flex w-full items-start gap-2 p-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.message}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center">View all messages</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                5
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: "New order", desc: "Order #1234 has been placed", time: "2m ago" },
              { title: "Payment received", desc: "$1,234.56 payment received", time: "1h ago" },
              { title: "New user", desc: "User John Doe has registered", time: "5h ago" },
              { title: "Server update", desc: "Server maintenance completed", time: "1d ago" },
            ].map((item, i) => (
              <DropdownMenuItem key={i} className="cursor-pointer">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

