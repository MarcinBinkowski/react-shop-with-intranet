"use client"

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
} from "lucide-react"
import { DataTable, type DataTableColumn, type DataTableFilter } from "@/components/data-table/data-table"
import { DataMetrics } from "@/components/data-table/data-metrics"

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
  },
]

const DocumentsPage = () => {
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
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Define columns for the data table
  const columns: DataTableColumn<Document>[] = [
    {
      id: "name",
      header: "Document",
      accessorKey: "name",
      cell: (document) => (
        <div className="flex items-center gap-2">
          {getDocumentIcon(document.type)}
          <div>
            <div className="font-medium">{document.name}</div>
            <div className="text-sm text-muted-foreground">{document.type}</div>
          </div>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
    },
    {
      id: "uploadedBy",
      header: "Uploaded By",
      accessorKey: "uploadedBy",
    },
    {
      id: "uploadDate",
      header: "Date",
      accessorKey: (document) => new Date(document.uploadDate).toLocaleDateString(),
    },
    {
      id: "size",
      header: "Size",
      accessorKey: "size",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: (document) => getStatusBadge(document.status),
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
      ],
    },
  ]

  // Define row actions
  const rowActions = [
    {
      label: "View document",
      icon: <Eye className="h-4 w-4" />,
      onClick: (document: Document) => console.log("View", document),
    },
    {
      label: "Download",
      icon: <Download className="h-4 w-4" />,
      onClick: (document: Document) => console.log("Download", document),
    },
    {
      label: "Share",
      icon: <Share2 className="h-4 w-4" />,
      onClick: (document: Document) => console.log("Share", document),
    },
    {
      label: "Delete document",
      icon: <Trash className="h-4 w-4" />,
      onClick: (document: Document) => console.log("Delete", document),
      className: "text-destructive",
    },
  ]

  // Define bulk actions
  const bulkActions = [
    {
      label: "Download selected",
      icon: <Download className="h-4 w-4" />,
      onClick: (documents: Document[]) => console.log("Download", documents),
    },
    {
      label: "Share selected",
      icon: <Share2 className="h-4 w-4" />,
      onClick: (documents: Document[]) => console.log("Share", documents),
    },
    {
      label: "Delete selected",
      icon: <Trash className="h-4 w-4" />,
      onClick: (documents: Document[]) => console.log("Delete", documents),
      className: "text-destructive",
    },
  ]

  // Render mobile card view
  const renderMobileCard = (document: Document, isSelected: boolean, toggleSelect: () => void) => (
    <Card key={document.id} className="overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Checkbox checked={isSelected} onCheckedChange={toggleSelect} className="mr-3" />
        <div className="mr-3">{getDocumentIcon(document.type)}</div>
        <div className="flex-1">
          <h3 className="font-medium">{document.name}</h3>
          <p className="text-sm text-muted-foreground">{document.category}</p>
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
            <DropdownMenuItem onClick={() => console.log("View", document)}>
              <Eye className="mr-2 h-4 w-4" />
              View document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Download", document)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Share", document)}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Delete", document)} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-2 p-4 gap-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Size:</span>
        </div>
        <div>{document.size}</div>

        <div>
          <span className="text-muted-foreground">Uploaded by:</span>
        </div>
        <div>{document.uploadedBy}</div>

        <div>
          <span className="text-muted-foreground">Date:</span>
        </div>
        <div>{new Date(document.uploadDate).toLocaleDateString()}</div>

        <div>
          <span className="text-muted-foreground">Status:</span>
        </div>
        <div>{getStatusBadge(document.status)}</div>
      </div>
    </Card>
  )

  // Define metrics for the dashboard
  const metrics = [
    {
      title: "Document Categories",
      value: new Set(documents.map((d) => d.category)).size,
      description: `Most common: ${
        Object.entries(
          documents.reduce(
            (acc, doc) => {
              acc[doc.category] = (acc[doc.category] || 0) + 1
              return acc
            },
            {} as Record<string, number>,
          ),
        ).sort((a, b) => b[1] - a[1])[0][0]
      }`,
    },
    {
      title: "Document Types",
      value: new Set(documents.map((d) => d.type)).size,
      description: `${documents.filter((d) => d.type === "PDF").length} PDFs, ${documents.filter((d) => d.type !== "PDF").length} other`,
    },
    {
      title: "Total Storage",
      value: `${(
        documents.reduce((sum, doc) => {
          const size = Number.parseFloat(doc.size.split(" ")[0])
          return sum + size
        }, 0)
      ).toFixed(1)} MB`,
      description: `Across ${documents.length} documents`,
    },
  ]

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
              <Plus className="mr-2 h-4 w-4" />
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
        data={documents}
        columns={columns}
        filters={filters}
        rowActions={rowActions}
        bulkActions={bulkActions}
        searchPlaceholder="Search documents..."
        getRowId={(document) => document.id}
        renderMobileCard={renderMobileCard}
      />

      <DataMetrics metrics={metrics} />
    </div>
  )
}

export default DocumentsPage

