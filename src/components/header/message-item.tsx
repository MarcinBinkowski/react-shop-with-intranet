import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { MessageItemProps } from './types'

export default function MessageItem({key, name, message, time}: MessageItemProps) {
  return (
    <DropdownMenuItem key={i} className="cursor-pointer p-0">
    <div className="flex w-full items-start gap-2 p-2">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  </DropdownMenuItem>
  )
}
