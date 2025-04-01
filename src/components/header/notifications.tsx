import React from 'react'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import NotificationItem from './notifications-item'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

const data = [
  {id: "1", title: "New order", description: "Order #1234 has been placed", time: "2m ago" },
  {id: "2", title: "Payment received", description: "$1,234.56 payment received", time: "1h ago" },
  {id: "3", title: "New user", description: "User John Doe has registered", time: "5h ago" },
  {id: "4", title: "Server update", description: "Server maintenance completed", time: "1d ago" },
]

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
      {data.map((item) => (
          <NotificationItem
            key={item.id}
            {...item}
          />
        ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer justify-center">View all notifications</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
