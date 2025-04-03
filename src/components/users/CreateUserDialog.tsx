import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  name: string
  email: string
  role: string
  department: string
  joinedDate: string
}

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (user: User) => void
}

export function CreateUserDialog({ open, onOpenChange, onSubmit }: CreateUserDialogProps) {
  const [newUser, setNewUser] = useState<User>({
    name: '',
    email: '',
    role: '',
    department: '',
    joinedDate: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newUser)
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      joinedDate: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 