"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import {
  UserPlus,
  Phone,
  MapPin,
  User,
  Calendar,
  Shield,
  MoreHorizontal,
  Briefcase,
  Edit,
  Trash,
  MessageSquare,
  Award,
  BarChart,
  Users,
} from "lucide-react"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/data-table/data-table"
import { DataMetrics } from "@/components/data-table/data-metrics"

// Team Member data type
interface TeamMember {
  id: number
  name: string
  email: string
  phone: string
  location: string
  role: string
  department: string
  joinDate: string
  status: string
  avatar?: string
  isAdmin: boolean
}

// Sample team member data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.j@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    role: "Product Manager",
    department: "Product",
    joinDate: "2021-05-12",
    status: "Active",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    email: "alex.r@company.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "2020-08-15",
    status: "Active",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    phone: "+1 (555) 345-6789",
    location: "Boston, MA",
    role: "UX Designer",
    department: "Design",
    joinDate: "2022-01-10",
    status: "Active",
    isAdmin: false,
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.b@company.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    role: "Marketing Director",
    department: "Marketing",
    joinDate: "2019-11-05",
    status: "Active",
    isAdmin: true,
  },
  {
    id: 5,
    name: "Jessica Wilson",
    email: "jessica.w@company.com",
    phone: "+1 (555) 567-8901",
    location: "Austin, TX",
    role: "Finance Analyst",
    department: "Finance",
    joinDate: "2021-09-20",
    status: "On Leave",
    isAdmin: false,
  },
  {
    id: 6,
    name: "David Garcia",
    email: "david.g@company.com",
    phone: "+1 (555) 678-9012",
    location: "Seattle, WA",
    role: "Frontend Developer",
    department: "Engineering",
    joinDate: "2022-03-14",
    status: "Active",
    isAdmin: false,
  },
  {
    id: 7,
    name: "Lisa Thompson",
    email: "lisa.t@company.com",
    phone: "+1 (555) 789-0123",
    location: "Portland, OR",
    role: "HR Manager",
    department: "HR",
    joinDate: "2020-06-08",
    status: "Active",
    isAdmin: true,
  },
  {
    id: 8,
    name: "James Martinez",
    email: "james.m@company.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    role: "Sales Representative",
    department: "Sales",
    joinDate: "2021-07-22",
    status: "Inactive",
    isAdmin: false,
  },
  {
    id: 9,
    name: "Olivia Lee",
    email: "olivia.l@company.com",
    phone: "+1 (555) 901-2345",
    location: "Miami, FL",
    role: "Content Strategist",
    department: "Marketing",
    joinDate: "2022-02-01",
    status: "Active",
    isAdmin: false,
  },
  {
    id: 10,
    name: "Robert Kim",
    email: "robert.k@company.com",
    phone: "+1 (555) 012-3456",
    location: "Los Angeles, CA",
    role: "Backend Developer",
    department: "Engineering",
    joinDate: "2021-04-30",
    status: "Active",
    isAdmin: false,
  },
]

const TeamPage = () => {
  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500">{status}</Badge>
      case "On Leave":
        return <Badge className="bg-yellow-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Define columns for the data table
  const columns: DataTableColumn<TeamMember>[] = [
    {
      id: "name",
      header: "Team Member",
      accessorKey: "name",
      cell: (member) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {member.avatar ? (
              <AvatarImage src={member.avatar} alt={member.name} />
            ) : (
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium flex items-center">
              {member.name}
              {member.isAdmin && <Shield className="ml-2 h-4 w-4 text-blue-500" title="Admin" />}
            </div>
            <div className="text-sm text-muted-foreground">{member.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role",
    },
    {
      id: "department",
      header: "Department",
      accessorKey: "department",
    },
    {
      id: "location",
      header: "Location",
      accessorKey: "location",
    },
    {
      id: "joinDate",
      header: "Joined",
      accessorKey: (member) => new Date(member.joinDate).toLocaleDateString(),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (member) => getStatusBadge(member.status),
    },
  ]

  // Define filters for the data table
  const filters: DataTableFilter<TeamMember>[] = [
    {
      id: "department",
      label: "Department",
      options: [
        ...Array.from(new Set(teamMembers.map((m) => m.department))).map((department) => ({
          label: department,
          value: department,
          filter: (member: TeamMember) => member.department === department,
        })),
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
          label: "Inactive",
          value: "Inactive",
          filter: (member) => member.status === "Inactive",
        },
        {
          label: "On Leave",
          value: "On Leave",
          filter: (member) => member.status === "On Leave",
        },
      ],
    },
    {
      id: "admin",
      label: "Admin Status",
      options: [
        {
          label: "Admins",
          value: "admin",
          filter: (member) => member.isAdmin === true,
        },
        {
          label: "Regular Members",
          value: "regular",
          filter: (member) => member.isAdmin === false,
        },
      ],
    },
  ]

  // Define row actions
  const rowActions = [
    {
      label: "Remove Member",
      icon: <Trash className="h-4 w-4" />,
      onClick: (member: TeamMember) => console.log("Delete", member),
      className: "text-destructive",
    },
  ]

  const bulkActions = [
    {
      label: "Remove Selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (members: TeamMember[]) => console.log("Delete", members),
      className: "text-destructive",
    },
  ]

  // Render mobile card view
  const renderMobileCard = (member: TeamMember, isSelected: boolean, toggleSelect: () => void) => (
    <Card key={member.id} className="overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Checkbox checked={isSelected} onCheckedChange={toggleSelect} className="mr-3" />
        <Avatar className="h-10 w-10 mr-3">
          {member.avatar ? (
            <AvatarImage src={member.avatar} alt={member.name} />
          ) : (
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium">{member.name}</h3>
            {member.isAdmin && <Shield className="ml-2 h-4 w-4 text-blue-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log("View profile", member)}>
              <User className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Send message to", member)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit", member)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Member
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Delete", member)} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Remove Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-2 p-4 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span>{member.role}</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-muted-foreground" />
          <span>{member.department}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{member.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{new Date(member.joinDate).toLocaleDateString()}</span>
        </div>
        <div>{getStatusBadge(member.status)}</div>
      </div>
    </Card>
  )

  // Define metrics for the dashboard
  const metrics = [
    {
      title: "Team Members",
      value: teamMembers.length,
      description: `${teamMembers.filter((m) => m.status === "Active").length} active members`,
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Departments",
      value: new Set(teamMembers.map((m) => m.department)).size,
      description: `Most members: ${
        Object.entries(
          teamMembers.reduce(
            (acc, member) => {
              acc[member.department] = (acc[member.department] || 0) + 1
              return acc
            },
            {} as Record<string, number>,
          ),
        ).sort((a, b) => b[1] - a[1])[0][0]
      }`,
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Admin Users",
      value: teamMembers.filter((m) => m.isAdmin).length,
      description: `${((teamMembers.filter((m) => m.isAdmin).length / teamMembers.length) * 100).toFixed(1)}% of team`,
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage your organization's team members</p>
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
              <DialogDescription>Add a new member to your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Job title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="admin" />
                <Label htmlFor="admin">Admin Access</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Team Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={teamMembers}
        columns={columns}
        filters={filters}
        rowActions={rowActions}
        bulkActions={bulkActions}
        searchPlaceholder="Search team members..."
        getRowId={(member) => member.id}
        renderMobileCard={renderMobileCard}
      />

      <DataMetrics metrics={metrics} />
    </div>
  )
}

export default TeamPage

