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

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  items: OrderItem[]
  totalAmount: number
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
    items: [
      { productId: '1', productName: 'Laptop Pro', quantity: 1, price: 1299.99 },
      { productId: '2', productName: 'Wireless Mouse', quantity: 2, price: 29.99 }
    ],
    totalAmount: 1359.97,
    shippingAddress: '123 Main St, City, Country',
    notes: 'Please handle with care'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Jane Doe',
    status: 'processing',
    orderDate: '2024-04-01',
    items: [
      { productId: '3', productName: 'Gaming Monitor', quantity: 1, price: 499.99 }
    ],
    totalAmount: 499.99,
    shippingAddress: '456 Oak Ave, Town, Country'
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
          <span className="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}
        </p>
        <div className="text-sm text-muted-foreground mt-2">
          <p className="font-semibold">Items:</p>
          <ul className="list-disc list-inside pl-2">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.productName} (${item.price.toFixed(2)} each)
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
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
              <Label htmlFor="edit-shipping">Shipping Address</Label>
              <Textarea
                id="edit-shipping"
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
    items: [],
    totalAmount: 0,
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
      items: [],
      totalAmount: 0,
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
    { label: 'Total Amount', value: 'totalAmount' },
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
              <Label htmlFor="create-shipping">Shipping Address</Label>
              <Textarea
                id="create-shipping"
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