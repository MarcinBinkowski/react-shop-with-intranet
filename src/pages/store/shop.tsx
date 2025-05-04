import { useEffect, useState } from 'react'
import { DataListPage } from '@/components/common/DataListPage'
import { DataCard } from '@/components/common/DataCard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/api/products'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
  imageBase64?: string
}


interface ProductFormProps {
  product: Partial<Product>
  onSubmit: (product: Omit<Product, 'id'>) => void
  submitLabel: string
}

function ProductForm({ product, onSubmit, submitLabel }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: product.name || '',
    category: product.category || '',
    price: product.price || 0,
    stock: product.stock || 0,
    status: product.status || 'In Stock',
    imageBase64: product.imageBase64 || ''  // Add this line
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageBase64">Image URL</Label>
        <Input
          id="imageBase64"
          value={formData.imageBase64}
          onChange={(e) => setFormData({ ...formData, imageBase64: e.target.value })}
          placeholder="Enter image URL or base64 string"
        />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

function ProductCard({ product, onDelete, onUpdate }: { 
  product: Product
  onDelete: (id: string) => void
  onUpdate: (product: Product) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedProduct: Omit<Product, 'id'>) => {
    onUpdate({ ...updatedProduct, id: product.id })
    setIsEditing(false)
  }

  return (
    <>
      <DataCard
        title={product.name}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(product.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Price:</span> ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Status:</span> {product.status}
        </p>
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={product}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const createdProduct = await createProduct(newProduct)
      setProducts(prev => [...prev, createdProduct])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)
      setProducts(prev => prev.filter(product => product.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct)
      setProducts(prev => prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      ))
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const filterFields = [
    {
      name: 'category',
      label: 'Category',
      options: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Accessories', value: 'Accessories' },
        { label: 'Software', value: 'Software' },
      ]
    },
    {
      name: 'status',
      label: 'Status',
      options: [
        { label: 'In Stock', value: 'In Stock' },
        { label: 'Low Stock', value: 'Low Stock' },
        { label: 'Out of Stock', value: 'Out of Stock' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Stock', value: 'stock' },
    { label: 'Category', value: 'category' },
  ]

  const defaultProduct = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'In Stock',
    imageBase64: null
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <DataListPage<Product>
        title="Products"
        items={products}
        renderItem={(product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        )}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search products..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['name', 'category']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={defaultProduct}
            onSubmit={handleCreateProduct}
            submitLabel="Create Product"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}