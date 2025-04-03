"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Filter, ArrowUpDown, MoreHorizontal, FileText, Download, Share2, Trash, Eye, FileArchive, FileIcon as FilePdf, FileImage, FileSpreadsheet, FileCode } from 'lucide-react'
import { useIsMobile } from "@/hooks/use-mobile"

// Sample document data
const documents = [
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
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter and sort documents
  const filteredDocuments = documents
    .filter((document) => {
      const matchesSearch =
        searchTerm === "" ||
        document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === null || document.category === selectedCategory
      const matchesStatus = selectedStatus === null || document.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (!sortField) return 0

      const fieldA = a[sortField as keyof typeof a]
      const fieldB = b[sortField as keyof typeof b]

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      }

      return 0
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((p) => p.id))
    }
  }

  const toggleSelectDocument = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((docId) => docId !== id))
    } else {
      setSelectedDocuments([...selectedDocuments, id])
    }
  }

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

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen)
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

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={toggleFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Filters {(selectedCategory || selectedStatus) && "(Active)"}
              </Button>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => handleSort("name")}>
                      Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("uploadDate")}>
                      Date {sortField === "uploadDate" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("category")}>
                      Category {sortField === "category" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {selectedDocuments.length > 0 && (
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    {selectedDocuments.length}
                  </Button>
                )}
              </div>
            </div>

            {isFilterOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <Label htmlFor="category-filter">Category</Label>
                  <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
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
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Confidential">Confidential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No documents found.</div>
              ) : (
                filteredDocuments.map((document) => (
                  <Card key={document.id} className="overflow-hidden">
                    <div className="flex items-center p-4 border-b">
                      <Checkbox
                        checked={selectedDocuments.includes(document.id)}
                        onCheckedChange={() => toggleSelectDocument(document.id)}
                        className="mr-3"
                      />
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View document
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
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
                ))
              )}
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="min-w-[250px]">Document</TableHead>
                    <TableHead className="min-w-[120px]">Category</TableHead>
                    <TableHead className="min-w-[120px]">Uploaded By</TableHead>
                    <TableHead className="min-w-[100px]">Date</TableHead>
                    <TableHead className="min-w-[80px]">Size</TableHead>
                    <TableHead className="min-w-[120px]">Status</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No documents found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedDocuments.includes(document.id)}
                            onCheckedChange={() => toggleSelectDocument(document.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDocumentIcon(document.type)}
                            <div>
                              <div className="font-medium">{document.name}</div>
                              <div className="text-sm text-muted-foreground">{document.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{document.category}</TableCell>
                        <TableCell>{document.uploadedBy}</TableCell>
                        <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>{getStatusBadge(document.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View document
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete document
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredDocuments.length} of {documents.length} documents
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Document Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(documents.map((d) => d.category)).size}</div>
            <p className="text-xs text-muted-foreground">
              Most common: {
                Object.entries(
                  documents.reduce((acc, doc) => {
                    acc[doc.category] = (acc[doc.category] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                )
                .sort((a, b) => b[1] - a[1])[0][0]
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Document Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              {Array.from(new Set(documents.map(d => d.type))).map((type) => (
                <div key={type} className="flex items-center gap-1">
                  {getDocumentIcon(type)}
                  <span className="text-sm">
                    {type}: {documents.filter((d) => d.type === type).length}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(documents.reduce((sum, doc) => {
                const size = parseFloat(doc.size.split(" ")[0])
                return sum + size
              }, 0)).toFixed(1)} MB
            </div>
            <p className="text-xs text-muted-foreground">Across {documents.length} documents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DocumentsPage
