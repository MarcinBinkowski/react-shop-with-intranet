"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
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
import {
  Plus,
  FileText,
  Download,
  Share2,
  Trash,
  Eye,
  FileArchive,
  FileIcon as FilePdf,
  FileImage,
  FileSpreadsheet,
  FileCode,
  MoreHorizontal,
  Edit,
  Upload,
} from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableCardConfig, DataTableColumn, DataTableFilter, DataTableAction } from "@/components/data-table/types"

// Document data type
interface Document {
  id: number
  name: string
  type: string
  category: string
  size: string
  uploadedBy: string
  uploadDate: string
  status: string
  lastModified: string
}

// Sample document data
const documents: Document[] = [
  {
    id: 1,
    name: "Q1 Financial Report",
    type: "PDF",
    category: "Finance",
    size: "2.4 MB",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-04-15",
    status: "Approved",
    lastModified: "2024-03-15",
  },
  {
    id: 2,
    name: "Employee Handbook 2023",
    type: "PDF",
    category: "HR",
    size: "5.7 MB",
    uploadedBy: "Michael Chen",
    uploadDate: "2023-03-22",
    status: "Approved",
    lastModified: "2024-03-10",
  },
  {
    id: 3,
    name: "Product Roadmap",
    type: "Spreadsheet",
    category: "Product",
    size: "1.2 MB",
    uploadedBy: "Alex Rodriguez",
    uploadDate: "2023-05-01",
    status: "Draft",
    lastModified: "2024-02-28",
  },
  {
    id: 4,
    name: "Marketing Campaign Assets",
    type: "Archive",
    category: "Marketing",
    size: "34.1 MB",
    uploadedBy: "Jessica Lee",
    uploadDate: "2023-04-28",
    status: "Approved",
    lastModified: "2024-03-20",
  },
  {
    id: 5,
    name: "Website Redesign Mockups",
    type: "Image",
    category: "Design",
    size: "8.3 MB",
    uploadedBy: "David Wilson",
    uploadDate: "2023-04-10",
    status: "Review",
    lastModified: "2024-03-18",
  },
  {
    id: 6,
    name: "API Documentation",
    type: "Code",
    category: "Engineering",
    size: "0.8 MB",
    uploadedBy: "Emma Garcia",
    uploadDate: "2023-05-05",
    status: "Draft",
    lastModified: "2024-03-15",
  },
  {
    id: 7,
    name: "Sales Presentation",
    type: "PDF",
    category: "Sales",
    size: "3.5 MB",
    uploadedBy: "James Smith",
    uploadDate: "2023-04-20",
    status: "Approved",
    lastModified: "2024-03-10",
  },
  {
    id: 8,
    name: "Legal Contracts",
    type: "PDF",
    category: "Legal",
    size: "1.9 MB",
    uploadedBy: "Olivia Brown",
    uploadDate: "2023-03-15",
    status: "Confidential",
    lastModified: "2024-03-15",
  },
]

const DocumentsPage = () => {
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [sortedData, setSortedData] = useState(documents)

  // Helper function to render document icons
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "Spreadsheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "Image":
        return <FileImage className="h-5 w-5 text-purple-500" />
      case "Archive":
        return <FileArchive className="h-5 w-5 text-yellow-500" />
      case "Code":
        return <FileCode className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

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
        return <Badge className="bg-red-500">{status}</Badge>
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>
      case "Archived":
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
          <span>{document.name}</span>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      sortable: true,
      cell: (document: Document) => (
        <span>{document.type}</span>
      ),
    },
    {
      id: "size",
      header: "Size",
      sortable: true,
      cell: (document: Document) => (
        <span>{document.size}</span>
      ),
    },
    {
      id: "lastModified",
      header: "Last Modified",
      sortable: true,
      cell: (document: Document) => (
        <span>{new Date(document.lastModified).toLocaleDateString()}</span>
      ),
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      cell: (document: Document) => getStatusBadge(document.status),
    },
  ]

  // Define filters for the data table
  const filters: DataTableFilter<Document>[] = [
    {
      id: "category",
      label: "Category",
      options: [
        ...Array.from(new Set(documents.map((doc) => doc.category))).map((category) => ({
          label: category,
          value: category,
          filter: (document: Document) => document.category === category,
        })),
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
        {
          label: "Active",
          value: "Active",
          filter: (document) => document.status === "Active",
        },
        {
          label: "Archived",
          value: "Archived",
          filter: (document) => document.status === "Archived",
        },
      ],
    },
  ]

  // Define row actions
  const rowActions: DataTableAction<Document>[] = [
    {
      label: "Edit Document",
      icon: <Edit className="h-4 w-4" />,
      onClick: (document: Document) => console.log("Edit", document),
    },
    {
      label: "Delete Document",
      icon: <Trash className="h-4 w-4" />,
      onClick: (document: Document) => console.log("Delete", document),
      className: "text-destructive",
    },
  ]

  // Define bulk actions
  const bulkActions = [
    {
      label: "Delete selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (documents: Document[]) => console.log("Delete", documents),
      className: "text-destructive",
    }
  ]

  const mobileCard: DataTableCardConfig<Document> = {
    primary: {
      title: (document) => document.name,
      subtitle: (document) => document.category,
      avatar: (document) => getDocumentIcon(document.type)
    },
    fields: [
      {
        label: "Size",
        value: (document) => document.size
      },
      {
        label: "Uploaded by",
        value: (document) => document.uploadedBy
      },
      {
        label: "Date",
        value: (document) => new Date(document.uploadDate).toLocaleDateString()
      },
      {
        label: "Status",
        value: (document) => getStatusBadge(document.status)
      }
    ],
    actions: [
      {
        label: "View document",
        icon: <Eye className="mr-2 h-4 w-4" />,
        onClick: (document) => console.log("View", document)
      },
      {
        label: "Download",
        icon: <Download className="mr-2 h-4 w-4" />,
        onClick: (document) => console.log("Download", document)
      },
      {
        label: "Share",
        icon: <Share2 className="mr-2 h-4 w-4" />,
        onClick: (document) => console.log("Share", document)
      },
      {
        label: "Delete document",
        icon: <Trash className="mr-2 h-4 w-4" />,
        onClick: (document) => console.log("Delete", document),
        variant: "destructive"
      }
    ]
  }

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Manage and organize company documents</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a new document to the company repository.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Document Name</Label>
                <Input id="name" placeholder="Enter document name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" />
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
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
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
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Confidential">Confidential</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        filters={filters}
        rowActions={rowActions}
        bulkActions={bulkActions}
        searchPlaceholder="Search documents..."
        getRowId={(document) => document.id}
        mobileCard={mobileCard}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
}

export default DocumentsPage

