import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { NotificationItemProps } from './header/types'

export default function NotificationItem({key, title, desc, time}: NotificationItemProps) {
  return (
    <DropdownMenuItem key={key} className="cursor-pointer">
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium leading-none">{title}</p>
      <p className="text-sm text-muted-foreground">{desc}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </DropdownMenuItem>  )
}
