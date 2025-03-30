import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from './ui/button'
import { Bell } from 'lucide-react'
import NotificationItem from './notifications-item'

export default function Notifications() {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          5
        </span>
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
        < NotificationItem {...item} key={i} />
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer justify-center">View all notifications</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
