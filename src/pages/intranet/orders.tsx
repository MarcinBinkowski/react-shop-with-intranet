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
import { Textarea } from "@/components/ui/textarea"

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

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'John Smith',
    status: 'delivered',
    orderDate: '2024-03-15',
    deliveryDate: '2024-03-20',
    amount: 299.99,
    shippingAddress: '123 Main St, New York, NY 10001',
    notes: 'Please leave at the front door'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Jane Doe',
    status: 'processing',
    orderDate: '2024-04-01',
    deliveryDate: '2024-04-05',
    amount: 149.50,
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001'
  },
]

function OrderCard({ order, onDelete, onUpdate }: { 
  order: Order
  onDelete: (id: string) => void
  onUpdate: (order: Order) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOrder, setEditedOrder] = useState(order)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onUpdate(editedOrder)
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
          {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Delivery Date:</span>{' '}
          {new Date(order.deliveryDate).toLocaleDateString()}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-order-number">Order Number</Label>
              <Input
                id="edit-order-number"
                value={editedOrder.orderNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedOrder({ ...editedOrder, orderNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-customer">Customer Name</Label>
              <Input
                id="edit-customer"
                value={editedOrder.customerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedOrder({ ...editedOrder, customerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedOrder.status}
                onValueChange={(value: Order['status']) => setEditedOrder({ ...editedOrder, status: value })}
              >
                <SelectTrigger id="edit-status">
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
              <Label htmlFor="edit-order-date">Order Date</Label>
              <Input
                id="edit-order-date"
                type="date"
                value={editedOrder.orderDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedOrder({ ...editedOrder, orderDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-delivery-date">Delivery Date</Label>
              <Input
                id="edit-delivery-date"
                type="date"
                value={editedOrder.deliveryDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedOrder({ ...editedOrder, deliveryDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                min="0"
                step="0.01"
                value={editedOrder.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedOrder({ ...editedOrder, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-shipping-address">Shipping Address</Label>
              <Textarea
                id="edit-shipping-address"
                value={editedOrder.shippingAddress}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedOrder({ ...editedOrder, shippingAddress: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={editedOrder.notes || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedOrder({ ...editedOrder, notes: e.target.value })}
                placeholder="Add notes here..."
              />
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({
    orderNumber: `ORD-${new Date().getFullYear()}-${String(mockOrders.length + 1).padStart(3, '0')}`,
    customerName: '',
    status: 'pending',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 0,
    shippingAddress: ''
  })

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const order = {
      ...newOrder,
      id: Math.random().toString(36).substr(2, 9)
    }
    setOrders([...orders, order])
    setIsCreateDialogOpen(false)
    setNewOrder({
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 2).padStart(3, '0')}`,
      customerName: '',
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: 0,
      shippingAddress: ''
    })
  }

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ))
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
          <form onSubmit={handleCreateOrder} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-order-number">Order Number</Label>
              <Input
                id="create-order-number"
                value={newOrder.orderNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOrder({ ...newOrder, orderNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-customer">Customer Name</Label>
              <Input
                id="create-customer"
                value={newOrder.customerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-status">Status</Label>
              <Select
                value={newOrder.status}
                onValueChange={(value: Order['status']) => setNewOrder({ ...newOrder, status: value })}
              >
                <SelectTrigger id="create-status">
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
              <Label htmlFor="create-order-date">Order Date</Label>
              <Input
                id="create-order-date"
                type="date"
                value={newOrder.orderDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-delivery-date">Delivery Date</Label>
              <Input
                id="create-delivery-date"
                type="date"
                value={newOrder.deliveryDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOrder({ ...newOrder, deliveryDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-amount">Amount</Label>
              <Input
                id="create-amount"
                type="number"
                min="0"
                step="0.01"
                value={newOrder.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewOrder({ ...newOrder, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-shipping-address">Shipping Address</Label>
              <Textarea
                id="create-shipping-address"
                value={newOrder.shippingAddress}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewOrder({ ...newOrder, shippingAddress: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-notes">Notes</Label>
              <Textarea
                id="create-notes"
                value={newOrder.notes || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewOrder({ ...newOrder, notes: e.target.value })}
                placeholder="Add notes here..."
              />
            </div>
            <Button type="submit" className="w-full">
              Create Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
} 