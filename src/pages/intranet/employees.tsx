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
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '@/api/employees'
import { formatDate } from '@/lib/utils'

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  joinedDate: string
}

interface EmployeeFormProps {
  employee: Partial<Employee>
  onSubmit: (employee: Omit<Employee, 'id'>) => void
  submitLabel: string
}

function EmployeeForm({ employee, onSubmit, submitLabel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: employee.name || '',
    email: employee.email || '',
    role: employee.role || '',
    department: employee.department || '',
    joinedDate: employee.joinedDate || new Date().toISOString().split('T')[0]
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

function EmployeeCard({ employee, onDelete, onUpdate }: { 
  employee: Employee
  onDelete: (id: string) => void
  onUpdate: (employee: Employee) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedEmployee: Omit<Employee, 'id'>) => {
    onUpdate({ ...updatedEmployee, id: employee.id })
    setIsEditing(false)
  }

  return (
    <>
      <DataCard
        title={employee.name}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(employee.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Email:</span> {employee.email}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Role:</span> {employee.role}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Department:</span> {employee.department}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Joined:</span>{' '}
          {formatDate(employee.joinedDate)}
        </p>
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <EmployeeForm
            employee={employee}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const dynamicFilterFields = useMemo(() => {
    const roles = Array.from(new Set(employees.map(employee => employee.role)))
    const departments = Array.from(new Set(employees.map(employee => employee.department)))
    
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
  }, [employees])
  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setIsLoading(true)
      const data = await getEmployees()
      setEmployees(data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCreateEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
    try {
      setIsLoading(true)
      const createdEmployee = await createEmployee(newEmployee)
      setEmployees(prev => [...prev, createdEmployee])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating employee:', error)
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId)
      setEmployees(prev => prev.filter(employee => employee.id !== employeeId))
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }

  const handleUpdateEmployee= async (updatedEmployee: Employee) => {
    try {
      await updateEmployee(updatedEmployee)
      setEmployees(prev => prev.map(employee => 
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      ))
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Department', value: 'department' },
    { label: 'Join Date', value: 'joinedDate' },
  ]

  const defaultEmployee = {
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
      <DataListPage<Employee>
        title="Employees"
        items={employees}
        renderItem={(employee) => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
            onDelete={handleDeleteEmployee}
            onUpdate={handleUpdateEmployee}
          />
        )}
        filterFields={dynamicFilterFields}
        sortFields={sortFields}
        searchPlaceholder="Search employees..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['name', 'email', 'department']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Employee</DialogTitle>
          </DialogHeader>
          <EmployeeForm
            employee={defaultEmployee}
            onSubmit={handleCreateEmployee}
            submitLabel="Create Employee"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}