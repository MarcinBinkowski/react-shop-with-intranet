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
import { formatDate, formatDateForForm } from '@/lib/utils'

interface User {
  id: string
  name: string
  email: string
  password: string
  address?: string
  birthDate: string
  joinedDate: string
  isAdmin: boolean
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
    password: user.password || '',
    address: user.address || '',
    birthDate: formatDateForForm(user.birthDate),
    joinedDate: formatDateForForm(user.joinedDate),
    isAdmin: user.isAdmin || false
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
          minLength={2}
          maxLength={100}
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
          minLength={3}
          maxLength={100}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          minLength={6}
          maxLength={100}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          maxLength={200}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="birthDate">Birth Date</Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="isAdmin"
          type="checkbox"
          checked={formData.isAdmin}
          onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="isAdmin">Is Admin</Label>
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
        {user.address && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Address:</span> {user.address}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Birth Date:</span>{' '}
          {formatDate(user.birthDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Joined Date:</span>{' '}
          {formatDate(user.joinedDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Role:</span>{' '}
          {user.isAdmin ? 'Administrator' : 'User'}
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

  const filterFields = [
    {
      name: 'isAdmin',
      label: 'Role',
      options: [
        { label: 'Administrator', value: 'true' },
        { label: 'User', value: 'false' }
      ]
    }
  ]

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Birth Date', value: 'birthDate' },
    { label: 'Joined Date', value: 'joinedDate' },
  ]

  const defaultUser = {
    name: '',
    email: '',
    password: '', // Added required password field
    address: '',
    birthDate: new Date().toISOString().split('T')[0],
    joinedDate: new Date().toISOString().split('T')[0],
    isAdmin: false
  }
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
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search users..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['name', 'email', 'address']}
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