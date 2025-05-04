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
import { createPayment } from '@/api/payments'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

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

const PAYMENT_METHODS = {
  'bank_transfer': {
    name: 'Bank Transfer',
    url: 'https://mbank.pl'
  },
  'paypal': {
    name: 'PayPal',
    url: 'https://paypal.com'
  },
  'credit_card': {
    name: 'Credit Card',
    url: 'https://pkobp.pl'
  }
} as const

type PaymentMethod = keyof typeof PAYMENT_METHODS

function OrderCard({ order, onUpdate }: { 
  order: Order
  onUpdate: (order: Order) => void 
}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer')

  const handlePayment = async () => {
    try {
      const payment = {
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: order.amount,
        method: paymentMethod,
        status: 'pending',
        date: new Date().toISOString()
      }
      
      await createPayment(payment)

      const paymentWindow = window.open(
        PAYMENT_METHODS[paymentMethod].url, 
        '_blank',
        'noopener,noreferrer'
      )
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
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full">
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
            >
              <SelectTrigger id="payment-method" className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            className="w-full" 
            onClick={handlePayment}
          >
            Pay Now with {PAYMENT_METHODS[paymentMethod].name}
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
      // await updateOrder(updatedOrder)
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