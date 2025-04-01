import { Button } from '../ui/button'
import { MessageSquare } from 'lucide-react'
import MessageItem from './message-item'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

const data = [
    { id: '1', name: "John Doe", message: "New order placed #1234", time: "2m ago" },
    { id: '2', name: "Sarah Smith", message: "Your report is ready", time: "1h ago" },
    { id: '3', name: "Team Support", message: "Meeting scheduled", time: "5h ago" },
    ]

export default function Messages() {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="relative">
        <MessageSquare/>
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
        {data.length}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-80">
      <DropdownMenuLabel>Messages</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {data.map((item) => (
        <MessageItem key={item.id} {...item}  />
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer justify-center">View all messages</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

