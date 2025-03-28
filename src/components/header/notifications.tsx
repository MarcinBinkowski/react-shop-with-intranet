import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Bell, Search } from 'lucide-react'
import NotificationItem from './notifications-item'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { getNotifications, getUnreadNotifications, markNotificationAsRead } from '@/api/notifications'
import { useUser } from '@/context/user-context'
import { useNavigate } from 'react-router-dom'

interface NotificationData {
  id: string
  title: string
  content: string
  isRead: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAllNotifications, setShowAllNotifications] = useState(false)
  const [open, setOpen] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    if (user?.id) {
      fetchUnreadNotifications()
    }
  }, [user?.id])

  const fetchUnreadNotifications = async () => {
    if (!user?.id) return
    const data = await getUnreadNotifications(user.id)
    setNotifications(data.sort((a, b) => Number(b.id) - Number(a.id)))
    setShowAllNotifications(false)
  }

  const fetchAllNotifications = async () => {
    if (!user?.id) return
    const data = await getNotifications()
    setNotifications(data.sort((a, b) => Number(b.id) - Number(a.id)))
    setShowAllNotifications(true)
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id)
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true }
            : notification
        )
      )
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const filteredNotifications = showAllNotifications 
    ? notifications.filter(notification => 
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notifications

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col gap-2 p-2">
          <DropdownMenuLabel>
            {showAllNotifications ? 'All Notifications' : 'Unread Notifications'}
          </DropdownMenuLabel>
          
          {showAllNotifications && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="max-h-[300px] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item, index) => (
              <NotificationItem
                key={item.id}
                id={item.id}
                title={`${index + 1}. ${item.title}`}
                description={item.content}
                isRead={item.isRead}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <DropdownMenuItem disabled>
              {searchQuery 
                ? 'No matching notifications' 
                : 'No notifications'}
            </DropdownMenuItem>
          )}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer justify-center"
          onSelect={(e) => {
            e.preventDefault()
            if (showAllNotifications) {
              setSearchQuery('')
            }
            showAllNotifications ? fetchUnreadNotifications() : fetchAllNotifications()
          }}
        >
          {showAllNotifications ? 'View unread' : 'View all notifications'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
