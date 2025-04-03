import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserCard } from '@/components/users/UserCard'
import { CreateUserDialog } from '@/components/users/CreateUserDialog'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  joinedDate: string
}

// Mock data - replace with actual API call
const mockUsers: User[] = [
  {
    id: '1',
    name: 'ABC ASD',
    email: 'cjohn@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinedDate: '2023-01-01'
  },
  {
    id: '2',
    name: 'BVASD ADS',
    email: 'bjohn@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinedDate: '2023-01-01'
  },
  {
    id: '3',
    name: 'ASD ASD',
    email: 'ajohn@example.com',
    role: 'Developer',
    department: 'Engineering',
    joinedDate: '2023-01-01'
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<keyof User>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.department.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1
        }
        return a[sortBy] < b[sortBy] ? 1 : -1
      })
  }, [users, search, sortBy, sortOrder])

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleCreateUser = (newUser: Omit<User, 'id'>) => {
    const user = {
      ...newUser,
      id: Math.random().toString(36).substr(2, 9)
    }
    setUsers([...users, user])
    setIsCreateDialogOpen(false)
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Add New User
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as keyof User)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="department">Department</SelectItem>
            <SelectItem value="joinedDate">Join Date</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
          />
        ))}
      </div>

      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateUser}
      />
    </div>
  )
} 