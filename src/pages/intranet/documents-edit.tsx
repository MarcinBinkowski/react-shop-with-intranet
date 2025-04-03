"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Trash, FileText, Download, Share2, FileArchive, FileIcon as FilePdf, FileImage, FileSpreadsheet, FileCode } from 'lucide-react'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Sample document data (same as in documents.tsx)
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
    description: "Quarterly financial report for Q1 2023",
    tags: ["finance", "quarterly", "report"],
    version: "1.0",
  },
  // ... other documents
]

// Available categories
const categories = ["Finance", "HR", "Product", "Marketing", "Design", "Engineering", "Sales", "Legal"]

// Available statuses
const statuses = ["Draft", "Review", "Approved", "Confidential"]

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

const DocumentEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    status: "",
    description: "",
    tags: [] as string[],
    version: "",
  })

  // Document info (read-only)
  const [documentInfo, setDocumentInfo] = useState({
    size: "",
    uploadedBy: "",
    uploadDate: "",
  })

  // Load document data
  useEffect(() => {
    // In a real app, this would be an API call
    const loadDocument = () => {
      setIsLoading(true)
      try {
        const document = documents.find(d => d.id === Number(id))
        
        if (!document) {
          setError("Document not found")
          return
        }
        
        setFormData({
          name: document.name,
          type: document.type,
          category: document.category,
          status: document.status,
          description: document.description || "",
          tags: document.tags || [],
          version: document.version || "1.0",
        })

        setDocumentInfo({
          size: document.size,
          uploadedBy: document.uploadedBy,
          uploadDate: document.uploadDate,
        })
      } catch (err) {
        setError("Failed to load document")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDocument()
  }, [id])

  // Handle form input changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle tag changes
  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
    setFormData(prev => ({
      ...prev,
      tags
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to update the document
    console.log("Updating document:", { id, ...formData })
    
    // Show success message and navigate back
    alert("Document updated successfully!")
    navigate("/intranet/documents")
  }

  // Handle delete
  const handleDelete = () => {
    // In a real app, this would be an API call to delete the document
    console.log("Deleting document:", id)
    
    // Navigate back after deletion
    navigate("/intranet/documents")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/intranet/documents")}>
            Back to Documents
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigate("/intranet/documents")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Document</h1>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Document
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the document
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
                <CardDescription>Update the document details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-muted rounded-md">
                    {getDocumentIcon(formData.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{formData.type} Document</p>
                    <p className="text-sm text-muted-foreground">{documentInfo.size}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Document Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => handleChange("name", e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description" 
                    className="w-full min-h-[100px] p-2 border rounded-md" 
                    value={formData.description} 
                    onChange={(e) => handleChange("description", e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    value={formData.tags.join(', ')} 
                    onChange={(e) => handleTagsChange(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input 
                    id="version" 
                    value={formData.version} 
                    onChange={(e) => handleChange("version", e.target.value)} 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => navigate("/intranet/documents")}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Uploaded By</span>
                <span>{documentInfo.uploadedBy}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Upload Date</span>
                <span>{new Date(documentInfo.uploadDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">File Size</span>
                <span>{documentInfo.size}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">File Type</span>
                <span>{formData.type}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="w-full">
                Replace File
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DocumentEditPage
