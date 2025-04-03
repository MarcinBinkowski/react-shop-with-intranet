"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  CreditCard,
  Star,
  Edit,
  Trash,
  Eye,
  MoreHorizontal,
} from "lucide-react"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/data-table/data-table"
import { DataMetrics } from "@/components/data-table/data-metrics"

// Customer data type
interface Customer {
  id: number
  name: string
  email: string
  phone: string
  location: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: string
  vip: boolean
}

// Sample customer data
const customers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    totalOrders: 12,
    totalSpent: 1245.67,
    lastOrder: "2023-05-01",
    status: "Active",
    vip: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    totalOrders: 8,
    totalSpent: 876.5,
    lastOrder: "2023-04-15",
    status: "Active",
    vip: false,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    totalOrders: 5,
    totalSpent: 432.25,
    lastOrder: "2023-04-28",
    status: "Active",
    vip: false,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, TX",
    totalOrders: 15,
    totalSpent: 1876.3,
    lastOrder: "2023-05-03",
    status: "Active",
    vip: true,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 567-8901",
    location: "Phoenix, AZ",
    totalOrders: 3,
    totalSpent: 245.75,
    lastOrder: "2023-03-20",
    status: "Inactive",
    vip: false,
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "+1 (555) 678-9012",
    location: "Philadelphia, PA",
    totalOrders: 7,
    totalSpent: 654.4,
    lastOrder: "2023-04-10",
    status: "Active",
    vip: false,
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "+1 (555) 789-0123",
    location: "San Antonio, TX",
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: "",
    status: "New",
    vip: false,
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 (555) 890-1234",
    location: "San Diego, CA",
    totalOrders: 9,
    totalSpent: 987.65,
    lastOrder: "2023-04-25",
    status: "Active",
    vip: true,
  },
]

const CustomersPage = () => {
  // Define columns for the data table
  const columns: DataTableColumn<Customer>[] = [
    {
      id: "name",
      header: "Customer",
      accessorKey: "name",
      cell: (customer) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center">
              {customer.name}
              {customer.vip && <Star className="ml-2 h-4 w-4 text-yellow-500" />}
            </div>
            <div className="text-sm text-muted-foreground">{customer.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "phone",
      header: "Contact",
      accessorKey: "phone",
    },
    {
      id: "location",
      header: "Location",
      accessorKey: "location",
    },
    {
      id: "totalOrders",
      header: "Orders",
      accessorKey: "totalOrders",
      meta: { className: "text-right" },
    },
    {
      id: "totalSpent",
      header: "Spent",
      accessorKey: (customer) => `$${customer.totalSpent.toFixed(2)}`,
      meta: { className: "text-right" },
    },
    {
      id: "lastOrder",
      header: "Last Order",
      accessorKey: (customer) => (customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "No orders"),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (customer) => getStatusBadge(customer.status),
    },
  ]

  // Define filters for the data table
  const filters: DataTableFilter<Customer>[] = [
    {
      id: "status",
      label: "Status",
      options: [
        {
          label: "Active",
          value: "Active",
          filter: (customer) => customer.status === "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
          filter: (customer) => customer.status === "Inactive",
        },
        {
          label: "New",
          value: "New",
          filter: (customer) => customer.status === "New",
        },
      ],
    },
    {
      id: "vip",
      label: "VIP Status",
      options: [
        {
          label: "VIP Only",
          value: "vip",
          filter: (customer) => customer.vip === true,
        },
        {
          label: "Regular Customers",
          value: "regular",
          filter: (customer) => customer.vip === false,
        },
      ],
    },
  ]

  // Define row actions
  const rowActions = [
    {
      label: "Delete customer",
      icon: <Trash className="h-4 w-4" />,
      onClick: (customer: Customer) => console.log("Delete", customer),
      className: "text-destructive",
    },
  ]

  // Define bulk actions
  const bulkActions = [
    {
      label: "Send email",
      icon: <Mail className="h-4 w-4" />,
      onClick: (customers: Customer[]) => console.log("Email to", customers),
    },
    {
      label: "Delete selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (customers: Customer[]) => console.log("Delete", customers),
      className: "text-destructive",
    },
  ]

  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500">{status}</Badge>
      case "New":
        return <Badge className="bg-blue-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Render mobile card view
  const renderMobileCard = (customer: Customer, isSelected: boolean, toggleSelect: () => void) => (
    <Card key={customer.id} className="overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Checkbox checked={isSelected} onCheckedChange={toggleSelect} className="mr-3" />
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium">{customer.name}</h3>
            {customer.vip && <Star className="ml-2 h-4 w-4 text-yellow-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
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
            <DropdownMenuItem onClick={() => console.log("View", customer)}>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit", customer)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit customer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Email", customer)}>
              <Mail className="mr-2 h-4 w-4" />
              Send email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Delete", customer)} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-2 p-4 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{customer.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <span>{customer.totalOrders} orders</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span>${customer.totalSpent.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : "No orders"}</span>
        </div>
        <div>{getStatusBadge(customer.status)}</div>
      </div>
    </Card>
  )

  // Define metrics for the dashboard
  const metrics = [
    {
      title: "Total Customers",
      value: customers.length,
      description: `${customers.filter((c) => c.status === "Active").length} active customers`,
    },
    {
      title: "VIP Customers",
      value: customers.filter((c) => c.vip).length,
      description: `${((customers.filter((c) => c.vip).length / customers.length) * 100).toFixed(1)}% of customer base`,
    },
    {
      title: "Total Revenue",
      value: `$${customers.reduce((sum, customer) => sum + customer.totalSpent, 0).toFixed(2)}`,
      description: `From ${customers.reduce((sum, customer) => sum + customer.totalOrders, 0)} orders`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Add a new customer to your database.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter customer name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="customer@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vip" />
                <Label htmlFor="vip">VIP Customer</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={customers}
        columns={columns}
        filters={filters}
        rowActions={rowActions}
        bulkActions={bulkActions}
        searchPlaceholder="Search customers..."
        getRowId={(customer) => customer.id}
        renderMobileCard={renderMobileCard}
      />

      <DataMetrics metrics={metrics} />
    </div>
  )
}

export default CustomersPage

