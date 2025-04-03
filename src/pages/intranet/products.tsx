"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Package, Edit, Trash } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumn, DataTableAction, DataTableFilter } from "@/components/data-table/types"

// Product data type
interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  status: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro X",
    price: 1299.99,
    category: "Electronics",
    stock: 15,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 29.99,
    category: "Accessories",
    stock: 50,
    status: "In Stock",
  },
  {
    id: 3,
    name: "4K Monitor",
    price: 499.99,
    category: "Electronics",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 89.99,
    category: "Accessories",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 49.99,
    category: "Accessories",
    stock: 25,
    status: "In Stock",
  },
]

const ProductsPage = () => {
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [sortedData, setSortedData] = useState(products)

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

  // Define row actions
  const rowActions: DataTableAction<Product>[] = [
    {
      label: "Edit Product",
      icon: <Edit className="h-4 w-4" />,
      onClick: (product) => console.log("Edit", product),
    },
    {
      label: "Delete Product",
      icon: <Trash className="h-4 w-4" />,
      onClick: (product) => console.log("Delete", product),
      className: "text-destructive",
    },
  ]

  // Define filters
  const filters: DataTableFilter<Product>[] = [
    {
      id: "category",
      label: "Category",
      options: [
        {
          label: "Electronics",
          value: "Electronics",
          filter: (product) => product.category === "Electronics",
        },
        {
          label: "Accessories",
          value: "Accessories",
          filter: (product) => product.category === "Accessories",
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

  // Define columns for the data table
  const columns: DataTableColumn<Product>[] = [
    {
      id: "name",
      header: "Product",
      sortable: true,
      cell: (product: Product) => (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      id: "price",
      header: "Price",
      sortable: true,
      cell: (product: Product) => (
        <span>${product.price.toFixed(2)}</span>
      ),
    },
    {
      id: "category",
      header: "Category",
      sortable: true,
    },
    {
      id: "stock",
      header: "Stock",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (product: Product) => getStatusBadge(product.status),
    },
  ]

  const handleSort = (columnId: string, direction: "asc" | "desc") => {
    setSortColumn(columnId)
    setSortDirection(direction)

    const sorted = [...products].sort((a, b) => {
      // Get raw values for sorting
      const aValue = a[columnId as keyof Product]
      const bValue = b[columnId as keyof Product]

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
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
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
              <DialogDescription>
                Add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="Enter category" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Initial Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        getRowId={(product) => product.id}
        searchPlaceholder="Search products..."
        rowActions={rowActions}
        filters={filters}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
}

export default ProductsPage

