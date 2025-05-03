import { useState } from 'react'
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

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
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
    status: product.status || 'In Stock'
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

  const handleCreateProduct = (newProduct: Omit<Product, 'id'>) => {
    const product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9)
    }
    setProducts([...products, product])
    setIsCreateDialogOpen(false)
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ))
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
    status: 'In Stock'
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