"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Edit, Trash, Copy, Eye, CheckCircle2, XCircle, AlertCircle, MoreHorizontal } from "lucide-react"
import { DataTable,  } from "@/components/data-table/data-table"
import { DataTableCardConfig, DataTableColumn, DataTableFilter } from "@/components/data-table/types"

// Product data type
interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Premium Ergonomic Chair",
    sku: "CHAIR-001",
    category: "Furniture",
    price: 299.99,
    stock: 24,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Adjustable Standing Desk",
    sku: "DESK-002",
    category: "Furniture",
    price: 499.99,
    stock: 15,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Wireless Keyboard",
    sku: "KB-003",
    category: "Electronics",
    price: 79.99,
    stock: 42,
    status: "In Stock",
  },
  {
    id: 4,
    name: "27-inch 4K Monitor",
    sku: "MON-004",
    category: "Electronics",
    price: 349.99,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    sku: "MOUSE-005",
    category: "Electronics",
    price: 49.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 6,
    name: "Leather Notebook",
    sku: "NB-006",
    category: "Stationery",
    price: 24.99,
    stock: 56,
    status: "In Stock",
  },
  {
    id: 7,
    name: "Premium Ballpoint Pens (12pk)",
    sku: "PEN-007",
    category: "Stationery",
    price: 12.99,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Desk Lamp with Wireless Charging",
    sku: "LAMP-008",
    category: "Furniture",
    price: 89.99,
    stock: 18,
    status: "In Stock",
  },
]

const ProductsPage = () => {
  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500">{status}</Badge>
      case "Low Stock":
        return <Badge className="bg-yellow-500">{status}</Badge>
      case "Out of Stock":
        return <Badge className="bg-red-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Define columns for the data table
  const columns: DataTableColumn<Product>[] = [
    {
      id: "name",
      header: "Product",
      accessorKey: "name",
      cell: (product) => (
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">{product.sku}</div>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
    },
    {
      id: "price",
      header: "Price",
      accessorKey: (product) => `$${product.price.toFixed(2)}`,
      meta: { className: "text-right" },
    },
    {
      id: "stock",
      header: "Stock",
      accessorKey: "stock",
      meta: { className: "text-right" },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (product) => getStatusBadge(product.status),
    },
  ]

  // Define filters for the data table
  const filters: DataTableFilter<Product>[] = [
    {
      id: "category",
      label: "Category",
      options: [
        {
          label: "Furniture",
          value: "Furniture",
          filter: (product) => product.category === "Furniture",
        },
        {
          label: "Electronics",
          value: "Electronics",
          filter: (product) => product.category === "Electronics",
        },
        {
          label: "Stationery",
          value: "Stationery",
          filter: (product) => product.category === "Stationery",
        },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        {
          label: "In Stock",
          value: "In Stock",
          filter: (product) => product.status === "In Stock",
        },
        {
          label: "Low Stock",
          value: "Low Stock",
          filter: (product) => product.status === "Low Stock",
        },
        {
          label: "Out of Stock",
          value: "Out of Stock",
          filter: (product) => product.status === "Out of Stock",
        },
      ],
    },
  ]

  // Define row actions
  const rowActions = [
    {
      label: "Edit product",
      icon: <Edit className="h-4 w-4" />,
      onClick: (product: Product) => console.log("Edit", product),
    },
    {
      label: "Delete product",
      icon: <Trash className="h-4 w-4" />,
      onClick: (product: Product) => console.log("Delete", product),
      className: "text-destructive",
    },
  ]

  // Define bulk actions
  const bulkActions = [
    {
      label: "Delete selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (products: Product[]) => console.log("Delete", products),
      className: "text-destructive",
    },
  ]

  const mobileCard: DataTableCardConfig<Product> = {
    primary: {
      title: (product) => product.name,
      subtitle: (product) => product.sku
    },
    fields: [
      {
        label: "Category",
        value: (product) => product.category
      },
      {
        label: "Price",
        value: (product) => `$${product.price.toFixed(2)}`,
        className: "font-medium"
      },
      {
        label: "Stock",
        value: (product) => product.stock.toString(),
        className: "text-right"
      },
      {
        label: "Status",
        value: (product) => getStatusBadge(product.status)
      }
    ],
    actions: [
      {
        label: "View details",
        icon: <Eye className="mr-2 h-4 w-4" />,
        onClick: (product) => console.log("View", product)
      },
      {
        label: "Edit product",
        icon: <Edit className="mr-2 h-4 w-4" />,
        onClick: (product) => console.log("Edit", product)
      },
      {
        label: "Duplicate",
        icon: <Copy className="mr-2 h-4 w-4" />,
        onClick: (product) => console.log("Duplicate", product)
      },
      {
        label: "Delete product",
        icon: <Trash className="mr-2 h-4 w-4" />,
        onClick: (product) => console.log("Delete", product),
        variant: "destructive"
      }
    ]
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Enter SKU" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Stationery">Stationery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={products}
        columns={columns}
        filters={filters}
        rowActions={rowActions}
        bulkActions={bulkActions}
        searchPlaceholder="Search products..."
        getRowId={(product) => product.id}
        mobileCard={mobileCard}
      />

    </div>
  )
}

export default ProductsPage

