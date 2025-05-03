import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import NotificationItem from './notifications-item'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'
import { getUnreadNotifications } from '@/api/notifications'
import { useUser } from '@/context/user-context'
import { useNavigate } from 'react-router-dom'

interface NotificationData {
  id: string
  title: string
  content: string
  // time?: string 
}

export default function Notifications() {
  const [unreadNotifications, setUnreadNotifications] = useState<NotificationData[]>([])
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.id) {
      fetchUnreadNotifications()
    }
  }, [user?.id])

  const fetchUnreadNotifications = async () => {
    if (!user?.id) return
    const data = await getUnreadNotifications(user.id)
    setUnreadNotifications(data)
  }

  const handleViewAll = () => {
    navigate('/notifications')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadNotifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((item) => (
            <NotificationItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.content}
            />
          ))
        ) : (
          <DropdownMenuItem disabled>
            No unread notifications
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer justify-center"
          onClick={handleViewAll}
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
