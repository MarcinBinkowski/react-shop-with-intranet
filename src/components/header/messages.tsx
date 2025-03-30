import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from '../ui/button'
import { MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import MessageItem from './message-item'

const data = [
    { name: "John Doe", message: "New order placed #1234", time: "2m ago" },
    { name: "Sarah Smith", message: "Your report is ready", time: "1h ago" },
    { name: "Team Support", message: "Meeting scheduled for tomorroww", time: "5h ago" },
  ]

export default function Messages() {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="relative">
        <MessageSquare className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        {data.length}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-80">
      <DropdownMenuLabel>Messages</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {data.map((item, i) => (
        <MessageItem {...item} key={i} />
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer justify-center">View all messages</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
