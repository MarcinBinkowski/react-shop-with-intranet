"use client"

import { Bell, Search, User, Menu, ShoppingCart, Settings } from 'lucide-react'
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
import { useState } from "react"

interface AppHeaderProps {
  title: string
  showSearch?: boolean
  onMenuClick?: () => void
}

export function AppHeader({ title, showSearch = true, onMenuClick }: AppHeaderProps) {
  const [cartCount, setCartCount] = useState(3)
  const [notificationCount, setNotificationCount] = useState(5)

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-8">
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
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {cartCount > 0 ? (
              <>
                {Array.from({ length: cartCount }).map((_, i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer p-0">
                    <div className="flex w-full items-start gap-2 p-2">
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Product {i + 1}</p>
                        <p className="text-sm text-muted-foreground">1 × ${((i + 1) * 19.99).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">${((i + 1) * 19.99).toFixed(2)}</p>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm font-medium">
                      $
                      {Array.from({ length: cartCount })
                        .reduce((acc, _, i) => acc + (i + 1) * 19.99, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full">Checkout</Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 px-4">
                <ShoppingCart className="h-10 w-10 text-muted-foreground/50 mb-2" />
                <p className="text-center text-muted-foreground">Your cart is empty</p>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {notificationCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { title: "New order", desc: "Order #1234 has been placed", time: "2m ago", unread: true },
              { title: "Payment received", desc: "$1,234.56 payment received", time: "1h ago", unread: true },
              { title: "New user", desc: "User John Doe has registered", time: "5h ago", unread: false },
              { title: "Server update", desc: "Server maintenance completed", time: "1d ago", unread: false },
            ].map((item, i) => (
              <DropdownMenuItem key={i} className="cursor-pointer p-0">
                <div className={`flex w-full items-start gap-2 p-2 ${item.unread ? "bg-muted/50" : ""}`}>
                  <div className={`mt-1 h-2 w-2 rounded-full ${item.unread ? "bg-primary" : "bg-muted"}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
