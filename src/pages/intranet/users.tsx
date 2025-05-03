import { useState, useMemo, useEffect } from 'react'
import { DataListPage } from '@/components/common/DataListPage'
import { DataCard } from '@/components/common/DataCard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUser, deleteUser, getUsers, updateUser } from '@/api/users'
import { formatDate } from '@/lib/utils'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  joinedDate: string
}

interface UserFormProps {
  user: Partial<User>
  onSubmit: (user: Omit<User, 'id'>) => void
  submitLabel: string
}

function UserForm({ user, onSubmit, submitLabel }: UserFormProps) {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: user.name || '',
    email: user.email || '',
    role: user.role || '',
    department: user.department || '',
    joinedDate: user.joinedDate || new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger id="role">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Developer">Developer</SelectItem>
            <SelectItem value="Designer">Designer</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select
          value={formData.department}
          onValueChange={(value) => setFormData({ ...formData, department: value })}
        >
          <SelectTrigger id="department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

function UserCard({ user, onDelete, onUpdate }: { 
  user: User
  onDelete: (id: string) => void
  onUpdate: (user: User) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedUser: Omit<User, 'id'>) => {
    onUpdate({ ...updatedUser, id: user.id })
    setIsEditing(false)
  }

  return (
    <>
      <DataCard
        title={user.name}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(user.id)}
      >
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
          {formatDate(user.joinedDate)}
        </p>
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <UserForm
            user={user}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const dynamicFilterFields = useMemo(() => {
    const roles = Array.from(new Set(users.map(user => user.role)))
    const departments = Array.from(new Set(users.map(user => user.department)))
    
    return [
      {
        name: 'role',
        label: 'Role',
        options: roles.map(role => ({
          label: role,
          value: role
        }))
      },
      {
        name: 'department',
        label: 'Department',
        options: departments.map(dept => ({
          label: dept,
          value: dept
        }))
      }
    ]
  }, [users])
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    try {
      setIsLoading(true)
      const createdUser = await createUser(newUser)
      setUsers(prev => [...prev, createdUser])
      setIsCreateDialogOpen(false)
      // await fetchUsers()
    } catch (error) {
      console.error('Error creating user:', error)
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId)
      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      await updateUser(updatedUser)
      setUsers(prev => prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ))
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Department', value: 'department' },
    { label: 'Join Date', value: 'joinedDate' },
  ]

  const defaultUser = {
    name: '',
    email: '',
    role: '',
    department: '',
    joinedDate: new Date().toISOString().split('T')[0]
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
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
        filterFields={dynamicFilterFields}
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
          <UserForm
            user={defaultUser}
            onSubmit={handleCreateUser}
            submitLabel="Create User"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}