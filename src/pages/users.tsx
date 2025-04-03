import { useState } from 'react'
import { DataListPage } from '@/components/common/DataListPage'
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

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinedDate: '2023-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Designer',
    department: 'Design',
    joinedDate: '2023-02-15'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Manager',
    department: 'Engineering',
    joinedDate: '2023-03-10'
  },
]

function UserCard({ user, onDelete, onUpdate }: { 
  user: User
  onDelete: (id: string) => void
  onUpdate: (user: User) => void 
}) {
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: '',
    department: '',
    joinedDate: new Date().toISOString().split('T')[0]
  })

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ))
  }

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    const user = {
      ...newUser,
      id: Math.random().toString(36).substr(2, 9)
    }
    setUsers([...users, user])
    setIsCreateDialogOpen(false)
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      joinedDate: new Date().toISOString().split('T')[0]
    })
  }

  const filterFields = [
    {
      name: 'role',
      label: 'Role',
      options: [
        { label: 'Developer', value: 'Developer' },
        { label: 'Designer', value: 'Designer' },
        { label: 'Manager', value: 'Manager' },
      ]
    },
    {
      name: 'department',
      label: 'Department',
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Design', value: 'Design' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Department', value: 'department' },
    { label: 'Join Date', value: 'joinedDate' },
  ]

  return (
    <>
      <DataListPage<User>
        title="Users"
        items={users}
        renderItem={(user) => (
          <UserCard 
            key={user.id} 
            user={user} 
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
          />
        )}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search users..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['name', 'email', 'department']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-name">Name</Label>
              <Input
                id="create-name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-role">Role</Label>
              <Input
                id="create-role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-department">Department</Label>
              <Input
                id="create-department"
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
    </>
  )
} 