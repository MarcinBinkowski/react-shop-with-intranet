"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, Building2, Edit, Trash } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumn, DataTableAction, DataTableFilter } from "@/components/data-table/types"

// Team member data type
interface TeamMember {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: string
}

// Sample team member data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@company.com",
    role: "UX Designer",
    department: "Design",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@company.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@company.com",
    role: "Sales Representative",
    department: "Sales",
    status: "Active",
  },
]

const TeamPage = () => {
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [sortedData, setSortedData] = useState(teamMembers)

  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>
      case "On Leave":
        return <Badge className="bg-yellow-500">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Define row actions
  const rowActions: DataTableAction<TeamMember>[] = [
    {
      label: "Edit Member",
      icon: <Edit className="h-4 w-4" />,
      onClick: (member) => console.log("Edit", member),
    },
    {
      label: "Remove Member",
      icon: <Trash className="h-4 w-4" />,
      onClick: (member) => console.log("Delete", member),
      className: "text-destructive",
    },
  ]

  // Define filters
  const filters: DataTableFilter<TeamMember>[] = [
    {
      id: "department",
      label: "Department",
      options: [
        {
          label: "Engineering",
          value: "Engineering",
          filter: (member) => member.department === "Engineering",
        },
        {
          label: "Product",
          value: "Product",
          filter: (member) => member.department === "Product",
        },
        {
          label: "Design",
          value: "Design",
          filter: (member) => member.department === "Design",
        },
        {
          label: "Marketing",
          value: "Marketing",
          filter: (member) => member.department === "Marketing",
        },
        {
          label: "Sales",
          value: "Sales",
          filter: (member) => member.department === "Sales",
        },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        {
          label: "Active",
          value: "Active",
          filter: (member) => member.status === "Active",
        },
        {
          label: "On Leave",
          value: "On Leave",
          filter: (member) => member.status === "On Leave",
        },
        {
          label: "Inactive",
          value: "Inactive",
          filter: (member) => member.status === "Inactive",
        },
      ],
    },
  ]

  // Define columns for the data table
  const columns: DataTableColumn<TeamMember>[] = [
    {
      id: "name",
      header: "Team Member",
      sortable: true,
      cell: (member: TeamMember) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "role",
      header: "Role",
      sortable: true,
      cell: (member: TeamMember) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{member.role}</span>
        </div>
      ),
    },
    {
      id: "department",
      header: "Department",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (member: TeamMember) => getStatusBadge(member.status),
    },
  ]

  const handleSort = (columnId: string, direction: "asc" | "desc") => {
    setSortColumn(columnId)
    setSortDirection(direction)

    const sorted = [...teamMembers].sort((a, b) => {
      // Get raw values for sorting
      const aValue = a[columnId as keyof TeamMember]
      const bValue = b[columnId as keyof TeamMember]

      if (typeof aValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(String(bValue))
          : String(bValue).localeCompare(aValue)
      }

      if (typeof aValue === "number") {
        return direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue)
      }

      return 0
    })

    setSortedData(sorted)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter team member name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="member@company.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Enter role" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Enter department" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Team Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        getRowId={(member) => member.id}
        searchPlaceholder="Search team members..."
        rowActions={rowActions}
        filters={filters}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
}

export default TeamPage

