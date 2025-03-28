import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Mail, MailOpen } from 'lucide-react'


interface NotificationItemProps {
  id: string
  title: string
  description: string
  isRead: boolean
  onMarkAsRead: (id: string) => Promise<void>
}

export default function NotificationItem({
  id,
  title,
  description,
  isRead,
  onMarkAsRead
}: NotificationItemProps) {
  const handleClick = () => {
    if (!isRead) {
      onMarkAsRead(id)
    }
  }

  return (
    <DropdownMenuItem 
      className={`flex flex-col items-start gap-1 p-4 cursor-pointer ${
        isRead ? 'opacity-70' : ''
      }`}
      onSelect={(e) => {
        e.preventDefault()
        handleClick()
      }}
    >
      <div className="flex w-full justify-between gap-4">
        <span className="font-medium">{title}</span>
        {isRead ? (
          <MailOpen className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Mail className="h-4 w-4 text-primary" />
        )}
      </div>
      <span className="text-sm text-muted-foreground line-clamp-2">
        {description}
      </span>
    </DropdownMenuItem>
  )
}