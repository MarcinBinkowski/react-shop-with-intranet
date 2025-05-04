import { useState, useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import { useUser } from '@/context/user-context'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, Trash2 } from "lucide-react"
import { createOrder, getUserOrders, updateOrder } from '@/api/orders'
import { formatDate } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { Label } from "@/components/ui/label"

interface Order {
  id: string
  orderNumber: string
  customerName: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  deliveryDate: string
  amount: number
  shippingAddress: string
  notes?: string
}

function OrderCard({ order, onUpdate }: { 
  order: Order
  onUpdate: (order: Order) => void 
}) {
  const handlePayment = async () => {
    try {
      const paymentWindow = window.open(`http://google.com`, '_blank', 'noopener,noreferrer')
      if (paymentWindow) {
        paymentWindow.focus()
      }
      const updatedOrder = {
        ...order,
        status: 'processing'
      }
      await onUpdate(updatedOrder)
    } catch (error) {
      console.error('Failed to process payment:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Order #{order.orderNumber}</span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Order Date:</span> {formatDate(order.orderDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Expected Delivery:</span> {formatDate(order.deliveryDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Shipping Address:</span> {order.shippingAddress}
        </p>
        <p className="text-lg font-semibold">
          Total: ${order.amount.toFixed(2)}
        </p>
      </CardContent>
      {order.status === 'pending' && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default function StoreOrdersPage() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [user, navigate])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const data = await getUserOrders(user.name)
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateOrder = async (updatedOrder: Order) => {
    try {
      await updateOrder(updatedOrder)
      setOrders(prev => prev.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      ))
    } catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center text-muted-foreground">
          You haven't placed any orders yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order}
              onUpdate={handleUpdateOrder}
            />
          ))}
        </div>
      )}
    </div>
  )
}