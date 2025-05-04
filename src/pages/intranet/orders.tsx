import { useEffect, useState } from 'react'
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
import { Textarea } from "@/components/ui/textarea"
import { formatDate, formatDateForForm } from '@/lib/utils'
import { getOrders, createOrder, deleteOrder, updateOrder, Order } from '@/api/orders'



interface OrderFormProps {
  order: Partial<Order>
  onSubmit: (order: Omit<Order, 'id'>) => void
  submitLabel: string
}

function OrderForm({ order, onSubmit, submitLabel }: OrderFormProps) {
  const [formData, setFormData] = useState<Omit<Order, 'id'>>({
    orderNumber: order.orderNumber || '',
    customerName: order.customerName || '',
    status: order.status || 'pending',
    orderDate: formatDateForForm(order.orderDate),
    deliveryDate: formatDateForForm(order.deliveryDate),    amount: order.amount || 0,
    shippingAddress: order.shippingAddress || '',
    notes: order.notes
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="order-number">Order Number</Label>
        <Input
          id="order-number"
          value={formData.orderNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, orderNumber: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customer">Customer Name</Label>
        <Input
          id="customer"
          value={formData.customerName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, customerName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: Order['status']) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order-date">Order Date</Label>
        <Input
          id="order-date"
          type="date"
          value={formData.orderDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, orderDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="delivery-date">Delivery Date</Label>
        <Input
          id="delivery-date"
          type="date"
          value={formData.deliveryDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, deliveryDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shipping-address">Shipping Address</Label>
        <Textarea
          id="shipping-address"
          value={formData.shippingAddress}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, shippingAddress: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add notes here..."
        />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

function OrderCard({ order, onDelete, onUpdate }: { 
  order: Order
  onDelete: (id: string) => void
  onUpdate: (order: Order) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedOrder: Omit<Order, 'id'>) => {
    onUpdate({ ...updatedOrder, id: order.id })
    setIsEditing(false)
  }

  const statusColors = {
    pending: 'text-yellow-600',
    processing: 'text-blue-600',
    shipped: 'text-purple-600',
    delivered: 'text-green-600',
    cancelled: 'text-red-600'
  }

  return (
    <>
      <DataCard
        title={order.orderNumber}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(order.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Customer:</span> {order.customerName}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Status:</span>{' '}
          <span className={statusColors[order.status]}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Order Date:</span>{' '}
          {formatDate(order.orderDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Delivery Date:</span>{' '}
           {formatDate(order.deliveryDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Amount:</span> ${order.amount.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Shipping Address:</span><br />
          {order.shippingAddress}
        </p>
        {order.notes && (
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold">Notes:</span><br />
            {order.notes}
          </p>
        )}
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>
          <OrderForm
            order={order}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateOrder = async (newOrder: Omit<Order, 'id'>) => {
    try {
      setIsLoading(true)
      const createdOrder = await createOrder(newOrder)
      setOrders(prev => [...prev, createdOrder])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId)
      setOrders(prev => prev.filter(order => order.id !== orderId))
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const handleUpdateOrder = async (updatedOrder: Order) => {
    try {
      await updateOrder(updatedOrder)
      setOrders(prev => prev.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      ))
    } catch (error) {
      console.error('Error updating order:', error)
    } 
  }

  const filterFields = [
    {
      name: 'status',
      label: 'Status',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Order Number', value: 'orderNumber' },
    { label: 'Customer Name', value: 'customerName' },
    { label: 'Order Date', value: 'orderDate' },
    { label: 'Delivery Date', value: 'deliveryDate' },
    { label: 'Amount', value: 'amount' },
  ]

  const defaultOrder = {
    orderNumber: `${new Date().getFullYear()}-`,
    customerName: '',
    status: 'pending' as const,
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 0,
    shippingAddress: ''
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <DataListPage<Order>
        title="Orders"
        items={orders}
        renderItem={(order) => (
          <OrderCard 
            key={order.id} 
            order={order}
            onDelete={handleDeleteOrder}
            onUpdate={handleUpdateOrder}
          />
        )}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search orders..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['orderNumber', 'customerName']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
          </DialogHeader>
          <OrderForm
            order={defaultOrder}
            onSubmit={handleCreateOrder}
            submitLabel="Create Order"
          />
        </DialogContent>
      </Dialog>
    </>
  )
} 