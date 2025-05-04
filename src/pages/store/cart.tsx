import { useEffect, useState, useMemo } from 'react'
import { getProducts } from '@/api/products'
import { useCart } from '@/context/cart-context'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
  imageBase64?: string
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, cartItems } = useCart()

  const isInCart = cartItems.some(item => item.id === product.id)

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-none">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          {product.imageBase64 ? (
            <img
              src={product.imageBase64}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex-none">
        <Button 
          className="w-full" 
          variant={product.status === 'Out of Stock' ? 'secondary' : 'default'}
          disabled={product.status === 'Out of Stock' || isInCart}
          onClick={handleAddToCart}
        >
          {product.status === 'Out of Stock' ? 'Out of Stock' : isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'price' | 'name'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showOutOfStock, setShowOutOfStock] = useState(true)

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

  const categories = Array.from(new Set(products.map(p => p.category)))

  const filterFields = useMemo(() => [
    {
      name: 'category',
      label: 'Category',
      options: [
        { label: 'All Categories', value: 'all' },
        ...categories.map(category => ({
          label: category,
          value: category
        }))
      ]
    },
    {
      name: 'status',
      label: 'Stock',
      options: [
        { label: 'All', value: 'all' },
        { label: 'In Stock Only', value: 'inStock' }
      ]
    }
  ], [categories])

  const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' }
  ]

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = !searchQuery || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        const matchesStock = showOutOfStock || product.status !== 'Out of Stock'
        return matchesSearch && matchesCategory && matchesStock
      })
      .sort((a, b) => {
        const multiplier = sortOrder === 'asc' ? 1 : -1
        if (sortBy === 'price') {
          return (a.price - b.price) * multiplier
        }
        return a.name.localeCompare(b.name) * multiplier
      })
  }, [products, searchQuery, selectedCategory, showOutOfStock, sortBy, sortOrder])

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Our Products</h1>
        </div>
        
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Filters */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Filters</Label>
            <div className="flex flex-wrap gap-2">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-out-of-stock"
                  checked={showOutOfStock}
                  onCheckedChange={setShowOutOfStock}
                />
                <Label htmlFor="show-out-of-stock">Show out of stock</Label>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sort</Label>
            <div className="flex flex-wrap gap-2">
              <Select
                value={sortBy}
                onValueChange={(value: 'price' | 'name') => setSortBy(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortFields.map(field => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortOrder}
                onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">
                    {sortBy === 'price' ? 'Low to High' : 'A to Z'}
                  </SelectItem>
                  <SelectItem value="desc">
                    {sortBy === 'price' ? 'High to Low' : 'Z to A'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center text-muted-foreground">
          Your cart is empty
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-24 h-24 overflow-hidden rounded-lg bg-gray-100">
                  {item.imageBase64 ? (
                    <img
                      src={item.imageBase64}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}