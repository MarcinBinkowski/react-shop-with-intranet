"use client";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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
  Edit,
  Trash,
  Eye,
  MoreHorizontal,
  Building2,
  Plus,
} from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumn, DataTableAction, DataTableFilter } from "@/components/data-table/types";
import { PageHeader } from "@/components/page-header/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Customer data type
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  company: string;
  lastContact: string;
}

// Sample customer data
const customers: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    city: "New York, NY",
    status: "Active",
    company: "Tech Corp",
    lastContact: "2024-03-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 234-5678",
    city: "Los Angeles, CA",
    status: "Active",
    company: "Design Studio",
    lastContact: "2024-03-10",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@company.com",
    phone: "+1 (555) 567-8901",
    city: "Phoenix, AZ",
    status: "Inactive",
    company: "Marketing Pro",
    lastContact: "2024-02-28",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@company.com",
    phone: "+1 (555) 789-0123",
    city: "San Antonio, TX",
    status: "Active",
    company: "Sales Co",
    lastContact: "2024-03-20",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@company.com",
    phone: "+1 (555) 567-8901",
    city: "Phoenix, AZ",
    status: "Active",
    company: "Consulting Group",
    lastContact: "2024-03-18",
  },
];

const CustomersPage = () => {
  const [sortColumn, setSortColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedData, setSortedData] = useState(customers);

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

  // Define row actions
  const rowActions: DataTableAction<Customer>[] = [
    {
      label: "Edit Customer",
      icon: <Edit className="h-4 w-4" />,
      onClick: (customer) => console.log("Edit", customer),
    },
    {
      label: "Delete Customer",
      icon: <Trash className="h-4 w-4" />,
      onClick: (customer) => console.log("Delete", customer),
      className: "text-destructive",
    },
  ];

  // Define filters
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
      ],
    },
  ];

  // Define columns for the data table
  const columns: DataTableColumn<Customer>[] = [
    {
      id: "name",
      header: "Customer",
      sortable: true,
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-sm text-muted-foreground">{customer.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: "company",
      header: "Company",
      sortable: true,
      cell: (customer: Customer) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span>{customer.company}</span>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (customer: Customer) => getStatusBadge(customer.status),
    },
    {
      id: "lastContact",
      header: "Last Contact",
      sortable: true,
      cell: (customer: Customer) => (
        <span>{new Date(customer.lastContact).toLocaleDateString()}</span>
      ),
    },
  ];

  const handleSort = (columnId: string, direction: "asc" | "desc") => {
    setSortColumn(columnId);
    setSortDirection(direction);

    const sorted = [...customers].sort((a, b) => {
      // Get raw values for sorting
      const aValue = a[columnId as keyof Customer];
      const bValue = b[columnId as keyof Customer];

      if (typeof aValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(String(bValue))
          : String(bValue).localeCompare(aValue);
      }

      if (typeof aValue === "number") {
        return direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return 0;
    });

    setSortedData(sorted);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Manage your customer database"
        action={{
          label: "Add Customer",
          icon: Plus,
          children: (
            <Dialog>
              <DialogTrigger asChild>
                <span />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Add a new customer to your database.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input id="name" placeholder="Enter customer name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="customer@example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Customer Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Customer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
        }}
      />

      <DataTable
        data={sortedData}
        columns={columns}
        getRowId={(customer) => customer.id}
        searchPlaceholder="Search customers..."
        rowActions={rowActions}
        filters={filters}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  );
};

export default CustomersPage;
