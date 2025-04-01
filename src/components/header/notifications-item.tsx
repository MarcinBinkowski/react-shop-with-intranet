import { DropdownMenuItem } from '../ui/dropdown-menu'
import { NotificationItemProps } from './types'


export default function NotificationItem({ title, description, time }: NotificationItemProps) {
  return (
    <DropdownMenuItem className="cursor-pointer p-0">
      <div className="flex w-full flex-col gap-1 p-2">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </DropdownMenuItem>
  )
}