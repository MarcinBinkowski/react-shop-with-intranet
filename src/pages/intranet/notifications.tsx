import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2 } from "lucide-react"
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification
} from '@/api/notifications'
import type { Notification } from '@/types/notification'

interface NotificationFormProps {
  notification: Partial<Notification>
  onSubmit: (n: Omit<Notification,'id'>) => void
  submitLabel: string
}
function NotificationForm({ notification, onSubmit, submitLabel }: NotificationFormProps) {
  const [data, setData] = useState<Omit<Notification,'id'>>({
    title: notification.title || '',
    content: notification.content || '',
    isRead: notification.isRead || false,
    userId: notification.userId || ''
  })
  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }
  return (
    <form onSubmit={handle} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          required maxLength={200}
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={data.content}
          onChange={e => setData({ ...data, content: e.target.value })}
          required maxLength={1000}
        />
      </div>
      <div className="flex items-center">
        <Checkbox
          id="isRead"
          checked={data.isRead}
          onCheckedChange={v => setData({ ...data, isRead: v as boolean })}
        />
        <Label htmlFor="isRead" className="ml-2">Read</Label>
      </div>
      <div>
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          value={data.userId}
          onChange={e => setData({ ...data, userId: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">{submitLabel}</Button>
    </form>
  )
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selected, setSelected] = useState<Notification | null>(null)

  useEffect(() => { fetchNotifications() }, [])

  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (n: Omit<Notification,'id'>) => {
    try {
      const created = await createNotification(n)
      setNotifications(prev => [...prev, created])
      setIsCreateOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdate = async (u: Notification) => {
    try {
      await updateNotification(u)
      setNotifications(prev =>
        prev.map(n => n.id === u.id ? u : n)
      )
      setIsEditOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id)
      setNotifications(prev => prev.filter(n => n.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-4 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button onClick={() => setIsCreateOpen(true)}>New</Button>
      </div>

      <div className="overflow-x-auto rounded border">
        <Table className="w-full">
        <TableHeader>
  <TableRow>
    <TableHead className="w-[80px] text-center whitespace-nowrap">
      Status
    </TableHead>
    <TableHead className="w-[25%] whitespace-nowrap">
      Title
    </TableHead>
    {/* remove hidden/md so content always shows */}
    <TableHead className="w-[45%] whitespace-nowrap">
      Content
    </TableHead>
    <TableHead className="w-[100px] text-center whitespace-nowrap">
      User ID
    </TableHead>
    <TableHead className="w-[100px] text-right pr-4 whitespace-nowrap">
      Actions
    </TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {notifications.map(n => (
    <TableRow key={n.id}>
      <TableCell className="text-center">
        <Checkbox checked={n.isRead} disabled />
      </TableCell>
      <TableCell>
        <div className="truncate" title={n.title}>{n.title}</div>
      </TableCell>
      {/* always show content, truncate within its 45% width */}
      <TableCell className="w-[45%]">
        <div className="truncate" title={n.content}>{n.content}</div>
      </TableCell>
      <TableCell className="text-center">
        <div className="truncate" title={n.userId}>{n.userId}</div>
      </TableCell>
      <TableCell className="text-right pr-4">
        <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { setSelected(n); setIsEditOpen(true) }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(n.id)}
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

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>New Notification</DialogTitle></DialogHeader>
          <NotificationForm
            notification={{ title: '', content: '', isRead: false, userId: '' }}
            onSubmit={handleCreate}
            submitLabel="Create"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Edit Notification</DialogTitle></DialogHeader>
          {selected && (
            <NotificationForm
              notification={selected}
              onSubmit={(data) => handleUpdate({ ...data, id: selected.id })}
              submitLabel="Save"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}