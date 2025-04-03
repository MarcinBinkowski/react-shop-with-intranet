"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  FileText,
  Link,
  Edit,
  Trash,
  Eye,
  Share2,
  ExternalLink,
} from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumn, DataTableAction, DataTableFilter } from "@/components/data-table/types"
import { PageHeader } from "@/components/page-header/page-header"

// Document data type
interface Document {
  id: number
  name: string
  url: string
  category: string
  size: string
  addedDate: string
  status: string
}

// Sample document data
const documents: Document[] = [
  {
    id: 1,
    name: "Q1 Financial Report",
    url: "https://docs.company.com/finance/q1-report",
    category: "Finance",
    size: "2.4 MB",
    addedDate: "2024-03-15T00:00:00",
    status: "Approved",
  },
  {
    id: 2,
    name: "Employee Handbook 2024",
    url: "https://docs.company.com/hr/handbook",
    category: "HR",
    size: "5.7 MB",
    addedDate: "2024-03-10T00:00:00",
    status: "Approved",
  },
  {
    id: 3,
    name: "Product Roadmap",
    url: "https://docs.company.com/product/roadmap",
    category: "Product",
    size: "1.2 MB",
    addedDate: "2024-02-28T00:00:00",
    status: "Draft",
  },
  {
    id: 4,
    name: "Marketing Campaign Plan",
    url: "https://docs.company.com/marketing/campaign",
    category: "Marketing",
    size: "3.4 MB",
    addedDate: "2024-03-20T00:00:00",
    status: "Review",
  },
  {
    id: 5,
    name: "Website Design Specs",
    url: "https://docs.company.com/design/website",
    category: "Design",
    size: "2.8 MB",
    addedDate: "2024-03-18T00:00:00",
    status: "Confidential",
  },
]

const DocumentsPage = () => {
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [sortedData, setSortedData] = useState(documents)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({})

  // Helper function to render status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">{status}</Badge>
      case "Review":
        return <Badge className="bg-yellow-500">{status}</Badge>
      case "Draft":
        return <Badge className="bg-blue-500">{status}</Badge>
      case "Confidential":
        return <Badge className="bg-gray-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Define columns for the data table
  const columns: DataTableColumn<Document>[] = [
    {
      id: "name",
      header: "Document",
      sortable: true,
      cell: (document: Document) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{document.name}</div>
            <div className="text-sm text-muted-foreground">{document.category}</div>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      sortable: true,
    },
    {
      id: "addedDate",
      header: "Added Date",
      sortable: true,
      cell: (document: Document) => (
        <span>{new Date(document.addedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}</span>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (document: Document) => getStatusBadge(document.status),
    },
  ]

  // Define filters
  const filters: DataTableFilter<Document>[] = [
    {
      id: "category",
      label: "Category",
      options: [
        {
          label: "Finance",
          value: "Finance",
          filter: (document) => document.category === "Finance",
        },
        {
          label: "HR",
          value: "HR",
          filter: (document) => document.category === "HR",
        },
        {
          label: "Product",
          value: "Product",
          filter: (document) => document.category === "Product",
        },
        {
          label: "Marketing",
          value: "Marketing",
          filter: (document) => document.category === "Marketing",
        },
        {
          label: "Design",
          value: "Design",
          filter: (document) => document.category === "Design",
        },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        {
          label: "Approved",
          value: "Approved",
          filter: (document) => document.status === "Approved",
        },
        {
          label: "Review",
          value: "Review",
          filter: (document) => document.status === "Review",
        },
        {
          label: "Draft",
          value: "Draft",
          filter: (document) => document.status === "Draft",
        },
        {
          label: "Confidential",
          value: "Confidential",
          filter: (document) => document.status === "Confidential",
        },
      ],
    },
  ]

  // Define row actions
  const rowActions: DataTableAction<Document>[] = [
    {
      label: "View Document",
      icon: <Eye className="h-4 w-4" />,
      onClick: (document) => window.open(document.url, "_blank"),
    },
    {
      label: "Share Link",
      icon: <Share2 className="h-4 w-4" />,
      onClick: (document) => console.log("Share", document.url),
    },
    {
      label: "Edit Details",
      icon: <Edit className="h-4 w-4" />,
      onClick: (document) => console.log("Edit", document),
    },
    {
      label: "Remove Link",
      icon: <Trash className="h-4 w-4" />,
      onClick: (document) => console.log("Delete", document),
      className: "text-destructive",
    },
  ]

  const handleSort = (columnId: string, direction: "asc" | "desc") => {
    setSortColumn(columnId)
    setSortDirection(direction)

    const sorted = [...documents].sort((a, b) => {
      // Get raw values for sorting
      const aValue = a[columnId as keyof Document]
      const bValue = b[columnId as keyof Document]

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

  const getCellValue = (column: DataTableColumn<Document>, document: Document): React.ReactNode => {
    if (column.cell) {
      return column.cell(document)
    }
    return ''
  }

  const filteredData = useMemo(() => {
    return documents
      .filter((document) => {
        // Search filter - only search by name
        const searchMatches =
          searchTerm === "" ||
          document.name.toLowerCase().includes(searchTerm.toLowerCase())

        // Custom filters
        const filterMatches = Object.entries(activeFilters).every(([filterId, filterValue]) => {
          if (!filterValue) return true
          const filter = filters.find((f) => f.id === filterId)
          if (!filter) return true
          const option = filter.options.find((o) => o.value === filterValue)
          return option ? option.filter(document) : true
        })

        return searchMatches && filterMatches
      })
      .sort((a, b) => {
        if (!sortColumn) return 0

        const column = columns.find((col) => col.id === sortColumn)
        if (!column) return 0

        const valueA = getCellValue(column, a)
        const valueB = getCellValue(column, b)

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortDirection === "asc" ? valueA - valueB : valueB - valueA
        }

        return 0
      })
  }, [documents, columns, filters, searchTerm, activeFilters, sortColumn, sortDirection])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Manage document links and references"
        action={{
          label: "Add Document Link",
          icon: Link,
          children: (
            <Dialog>
              <DialogTrigger asChild>
                <span />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Document Link</DialogTitle>
                  <DialogDescription>
                    Add a new document link to your repository.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Document Name</Label>
                    <Input id="name" placeholder="Enter document name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">Document URL</Label>
                    <Input id="url" placeholder="https://docs.company.com/..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
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
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Review">Review</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Confidential">Confidential</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
        }}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        getRowId={(document) => document.id}
        searchPlaceholder="Search documents..."
        rowActions={rowActions}
        filters={filters}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
}

export default DocumentsPage

