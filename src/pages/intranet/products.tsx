import { useState } from 'react'
import { DataListPage } from '@/components/common/DataListPage'
import { DataCard } from '@/components/common/DataCard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299.99,
    stock: 50,
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 29.99,
    stock: 5,
    status: 'low-stock'
  },
  {
    id: '3',
    name: 'Gaming Monitor',
    category: 'Electronics',
    price: 499.99,
    stock: 0,
    status: 'out-of-stock'
  },
]

function ProductCard({ product, onDelete, onUpdate }: { 
  product: Product
  onDelete: (id: string) => void
  onUpdate: (product: Product) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedProduct)
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
          <span className="font-semibold">Status:</span>{' '}
          <span className={
            product.status === 'in-stock' ? 'text-green-600' :
            product.status === 'low-stock' ? 'text-yellow-600' :
            'text-red-600'
          }>
            {product.status.replace('-', ' ')}
          </span>
        </p>
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={editedProduct.category}
                onValueChange={(value) => setEditedProduct({ ...editedProduct, category: value })}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                min="0"
                step="0.01"
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock</Label>
              <Input
                id="edit-stock"
                type="number"
                min="0"
                value={editedProduct.stock}
                onChange={(e) => setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedProduct.status}
                onValueChange={(value: Product['status']) => setEditedProduct({ ...editedProduct, status: value })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'in-stock'
  })

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9)
    }
    setProducts([...products, product])
    setIsCreateDialogOpen(false)
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'in-stock'
    })
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
      ]
    },
    {
      name: 'status',
      label: 'Status',
      options: [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Low Stock', value: 'low-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Stock', value: 'stock' },
  ]

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
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-name">Name</Label>
              <Input
                id="create-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-category">Category</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
              >
                <SelectTrigger id="create-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-price">Price</Label>
              <Input
                id="create-price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-stock">Stock</Label>
              <Input
                id="create-stock"
                type="number"
                min="0"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-status">Status</Label>
              <Select
                value={newProduct.status}
                onValueChange={(value: Product['status']) => setNewProduct({ ...newProduct, status: value })}
              >
                <SelectTrigger id="create-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Create Product
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
} 