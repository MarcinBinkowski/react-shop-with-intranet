import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { useUser } from '@/context/user-context'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, Trash2 } from "lucide-react"
import { createOrder } from '@/api/orders'
import { useNavigate } from 'react-router-dom'
import { Label } from "@/components/ui/label"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()
  const [isOrdering, setIsOrdering] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateOrder = async () => {
    if (!user) {
      setError('Please log in to place an order')
      navigate('/login')
      return
    }

    try {
      setIsOrdering(true)
      setError(null)
      
      const order = {
        orderNumber: `ORD-${Date.now()}`,
        customerName: user.name,
        status: 'pending' as const,
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        amount: total,
        shippingAddress: user.address,
        notes: ''
      }

      await createOrder(order)
      clearCart()
      navigate('/')
    } catch (error) {
      console.error('Failed to create order:', error)
      setError('Failed to create order. Please try again.')
    } finally {
      setIsOrdering(false)
    }
  }

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
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)}
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
              <div className="space-y-2">
                <Label>Shipping Address</Label>
                <p className="text-sm border rounded-md p-3 bg-muted">
                  {user?.address}
                </p>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {error && (
                <p className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button 
                className="w-full" 
                onClick={handleCreateOrder}
                disabled={isOrdering}
              >
                {isOrdering ? "Processing..." : "Order Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}