"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "lucide-react";
import {
  DataTable,
} from "@/components/data-table/data-table";
import { DataTableCardConfig, DataTableColumn, DataTableFilter } from "@/components/data-table/types";

// Customer data type
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
}

// Sample customer data
const customers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",

    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",

    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",

    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, TX",
    status: "Active",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 567-8901",
    location: "Phoenix, AZ",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "+1 (555) 678-9012",
    location: "Philadelphia, PA",
    status: "Active",
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "+1 (555) 789-0123",
    location: "San Antonio, TX",
    status: "New",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 (555) 890-1234",
    location: "San Diego, CA",
    status: "Active",
  },
];

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
            </div>
            <div className="text-sm text-muted-foreground">
              {customer.email}
            </div>
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
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (customer) => getStatusBadge(customer.status),
    },
  ];

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
  ];

  // Define row actions
  const rowActions = [
    {
      label: "Edit customer",
      icon: <Trash className="h-4 w-4" />,
      onClick: (customer: Customer) => console.log("Edit", customer),
    },
    {
      label: "Delete customer",
      icon: <Trash className="h-4 w-4" />,
      onClick: (customer: Customer) => console.log("Delete", customer),
      className: "text-destructive",
    },
  ];

  // Define bulk actions
  const bulkActions = [
    {
      label: "Delete selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (customers: Customer[]) => console.log("Delete", customers),
      className: "text-destructive",
    },
  ];

  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Inactive":
        return <Badge className="bg-gray-500">{status}</Badge>;
      case "New":
        return <Badge className="bg-blue-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Render mobile card view
  const renderMobileCard = (
    customer: Customer,
    isSelected: boolean,
    toggleSelect: () => void
  ) => (
    <Card key={customer.id} className="overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Checkbox
          checked={isSelected}
          onCheckedChange={toggleSelect}
          className="mr-3"
        />
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {customer.name}
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
            <DropdownMenuItem
              onClick={() => console.log("Delete", customer)}
              className="text-destructive"
            >
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
        <div>{getStatusBadge(customer.status)}</div>
      </div>
    </Card>
  );
  const mobileCard: DataTableCardConfig<Customer> = {
    primary: {
      title: (customer) => customer.name,
      subtitle: (customer) => customer.email,
      avatar: (customer) => (
        <Avatar className="h-10 w-10">
          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )
    },
    fields: [
      {
        label: "Phone",
        value: (customer) => (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
        )
      },
      {
        label: "Location",
        value: (customer) => (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{customer.location}</span>
          </div>
        )
      },
      {
        label: "Status",
        value: (customer) => getStatusBadge(customer.status)
      }
    ],
    actions: [
  {
        label: "Send email",
        icon: <Mail className="mr-2 h-4 w-4" />,
        onClick: (customer) => console.log("Email", customer)
      },
      {
        label: "Delete customer",
        icon: <Trash className="mr-2 h-4 w-4" />,
        onClick: (customer) => console.log("Delete", customer),
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage Customers
          </p>
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
              <DialogDescription>
                Add a new customer to the database.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter customer name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer@example.com"
                  />
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
        mobileCard={mobileCard}
      />
    </div>
  );
};

export default CustomersPage;
