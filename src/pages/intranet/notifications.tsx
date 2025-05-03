import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createNotification, deleteNotification, getNotifications, updateNotification } from '@/api/notifications'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2 } from "lucide-react"

export interface Notification {
  id: string
  title: string
  content: string
  isRead: boolean
  userId: string
}

interface NotificationFormProps {
  notification: Partial<Notification>
  onSubmit: (notification: Omit<Notification, 'id'>) => void
  submitLabel: string
}

function NotificationForm({ notification, onSubmit, submitLabel }: NotificationFormProps) {
  const [formData, setFormData] = useState<Omit<Notification, 'id'>>({
    title: notification.title || '',
    content: notification.content || '',
    isRead: notification.isRead || false,
    userId: notification.userId || ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          maxLength={200}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          maxLength={1000}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isRead"
          checked={formData.isRead}
          onCheckedChange={(checked) => setFormData({ ...formData, isRead: checked as boolean })}
        />
        <Label htmlFor="isRead">Is Read</Label>
      </div>
      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const data = await getNotifications()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNotification = async (newNotification: Omit<Notification, 'id'>) => {
    try {
      const createdNotification = await createNotification(newNotification)
      setNotifications(prev => [...prev, createdNotification])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating notification:', error)
    }
  }

  const handleUpdateNotification = async (updatedNotification: Notification) => {
    try {
      await updateNotification(updatedNotification)
      setNotifications(prev => prev.map(notification => 
        notification.id === updatedNotification.id ? updatedNotification : notification
      ))
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error('Error updating notification:', error)
    }
  }

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId)
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId))
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const defaultNotification = {
    title: '',
    content: '',
    isRead: false,
    userId: ''
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create New</Button>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Status</TableHead>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead className="min-w-[400px]">Content</TableHead>
              <TableHead className="w-[120px]">User ID</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox 
                      checked={notification.isRead} 
                      disabled 
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell className="max-w-[400px] truncate">
                  {notification.content}
                </TableCell>
                <TableCell>{notification.userId}</TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedNotification(notification)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
          </DialogHeader>
          <NotificationForm
            notification={defaultNotification}
            onSubmit={handleCreateNotification}
            submitLabel="Create Notification"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <NotificationForm
              notification={selectedNotification}
              onSubmit={(updated) => handleUpdateNotification({ ...updated, id: selectedNotification.id })}
              submitLabel="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

}