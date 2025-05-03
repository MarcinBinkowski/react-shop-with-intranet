import { useState, useEffect } from 'react'
import { DataListPage } from '@/components/common/DataListPage'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { getNotifications, createNotification, updateNotification, deleteNotification } from '@/api/notifications'
import { DataCard } from '@/components/common/DataCard'

export interface Notification {
  id: string
  title: string
  content: string
  isRead: boolean
  userId: number
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
    userId: notification.userId || 0
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
          onCheckedChange={(checked) => 
            setFormData({ ...formData, isRead: checked as boolean })
          }
        />
        <Label htmlFor="isRead">Mark as read</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          type="number"
          min={0}
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) })}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

function NotificationCard({ notification, onDelete, onUpdate }: { 
  notification: Notification
  onDelete: (id: string) => void
  onUpdate: (notification: Notification) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedNotification: Omit<Notification, 'id'>) => {
    onUpdate({ ...updatedNotification, id: notification.id })
    setIsEditing(false)
  }

  return (
    <>
      <DataCard
        title={notification.title}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(notification.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Content:</span> {notification.content}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Status:</span> {notification.isRead ? 'Read' : 'Unread'}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">User ID:</span> {notification.userId}
        </p>
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
          </DialogHeader>
          <NotificationForm
            notification={notification}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
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
      const created = await createNotification(newNotification)
      setNotifications(prev => [...prev, created])
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
      setSelectedNotification(null)
    } catch (error) {
      console.error('Error updating notification:', error)
    }
  }

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id)
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

  const filterFields = [
    {
      name: 'isRead',
      label: 'Status',
      options: [
        { label: 'Read', value: 'true' },
        { label: 'Unread', value: 'false' }
      ]
    }
  ]

  const sortFields = [
    { label: 'Title', value: 'title' },
    { label: 'User ID', value: 'userId' }
  ]

  const defaultNotification = {
    title: '',
    content: '',
    isRead: false,
    userId: 0
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      <DataListPage<Notification>
        title="Notifications"
        items={notifications}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search notifications..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['title', 'content']}
        renderItem={(notification) => (
          <NotificationCard
            key={notification.id} 
            notification={notification} 
            onDelete={handleDeleteNotification}
            onUpdate={handleUpdateNotification}
          />
        )}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <NotificationForm
              notification={selectedNotification}
              onSubmit={(data) => handleUpdateNotification({ ...data, id: selectedNotification.id })}
              submitLabel="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}