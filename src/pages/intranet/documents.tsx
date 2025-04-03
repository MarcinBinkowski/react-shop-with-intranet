"use client"

import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Link,
  Edit,
  Trash,
  Eye,
  Share2,
} from "lucide-react"
import { DataTableColumn, DataTableAction, DataTableFilter } from "@/components/data-table/types"
import { ListPage } from "@/components/list-page/list-page"

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
      label: "Edit Document",
      icon: <Edit className="h-4 w-4" />,
      onClick: (document) => console.log("Edit", document),
    },
    {
      label: "Remove Document",
      icon: <Trash className="h-4 w-4" />,
      onClick: (document) => console.log("Delete", document),
      className: "text-destructive",
    },
  ]

  return (
    <ListPage<Document>
      title="Documents"
      description="Manage document links and references"
      data={documents}
      columns={columns}
      rowActions={rowActions}
      getRowId={(document) => document.id}
      searchPlaceholder="Search documents..."
      action={{
        label: "Add Document Link",
        icon: Link,
        dialog: {
          title: "Add New Document Link",
          description: "Add a new document link to your repository.",
          submitLabel: "Add Link",
          layout: "double",
          fields: [
            {
              id: "name",
              label: "Document Name",
              type: "text",
              placeholder: "Enter document name",
            },
            {
              id: "url",
              label: "Document URL",
              type: "text",
              placeholder: "https://docs.company.com/...",
            },
            {
              id: "category",
              label: "Category",
              type: "select",
              options: [
                { label: "Finance", value: "Finance" },
                { label: "HR", value: "HR" },
                { label: "Product", value: "Product" },
                { label: "Marketing", value: "Marketing" },
                { label: "Design", value: "Design" },
              ],
            },
            {
              id: "status",
              label: "Status",
              type: "select",
              options: [
                { label: "Approved", value: "Approved" },
                { label: "Review", value: "Review" },
                { label: "Draft", value: "Draft" },
                { label: "Confidential", value: "Confidential" },
              ],
            },
          ],
        },
      }}
    />
  )
}

export default DocumentsPage

