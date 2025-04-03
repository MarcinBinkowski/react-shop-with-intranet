import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  joinedDate: string
}

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
  onUpdate: (user: User) => void
}

export function UserCard({ user, onDelete, onUpdate }: UserCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedUser)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Department:</span> {user.department}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Joined:</span>{' '}
            {new Date(user.joinedDate).toLocaleDateString()}
          </p>
          <div className="flex gap-2 pt-4">
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={editedUser.role}
                      onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={editedUser.department}
                      onChange={(e) => setEditedUser({ ...editedUser, department: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(user.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 