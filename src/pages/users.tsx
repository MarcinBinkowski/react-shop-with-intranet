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
import {
  Card,
  CardContent,
} from "@/components/ui/card"

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
  // Add more mock users as needed
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<keyof User>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')

  // Get unique roles and departments for filter options
  const uniqueRoles = useMemo(() => 
    Array.from(new Set(users.map(user => user.role))).sort(),
    [users]
  )

  const uniqueDepartments = useMemo(() => 
    Array.from(new Set(users.map(user => user.department))).sort(),
    [users]
  )

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = 
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.department.toLowerCase().includes(search.toLowerCase())
        
        const matchesRole = roleFilter === 'all' || user.role === roleFilter
        const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter

        return matchesSearch && matchesRole && matchesDepartment
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1
        }
        return a[sortBy] < b[sortBy] ? 1 : -1
      })
  }, [users, search, sortBy, sortOrder, roleFilter, departmentFilter])

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

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as keyof User)}
                >
                  <SelectTrigger>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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