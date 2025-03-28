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
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { formatDate, formatDateForForm } from '@/lib/utils'
import { createPayment, deletePayment, getPayments, updatePayment, Payment} from '@/api/payments'


interface PaymentFormProps {
  payment: Partial<Payment>
  onSubmit: (payment: Omit<Payment, 'id'>) => void
  submitLabel: string
}

function PaymentForm({ payment, onSubmit, submitLabel }: PaymentFormProps) {
  const [formData, setFormData] = useState<Omit<Payment, 'id'>>({
    paymentMethod: payment.paymentMethod || '',
    amount: payment.amount || 0,
    paymentDate: formatDateForForm(payment.paymentDate),
    notes: payment.notes || '',
    orderId: payment.orderId || ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select
          value={formData.paymentMethod}
          onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
        >
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Credit Card">Credit Card</SelectItem>
            <SelectItem value="PayPal">PayPal</SelectItem>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="paymentDate">Payment Date</Label>
        <Input
          id="paymentDate"
          type="date"
          value={formData.paymentDate}
          onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          maxLength={500}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="orderId">Order ID</Label>
        <Input
          id="orderId"
          value={formData.orderId}
          onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

function PaymentCard({ payment, onDelete, onUpdate }: {
  payment: Payment
  onDelete: (id: string) => void
  onUpdate: (payment: Payment) => void
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedPayment: Omit<Payment, 'id'>) => {
    onUpdate({ ...updatedPayment, id: payment.id })
    setIsEditing(false)
  }

  return (
    <>
      <DataCard
        title={`Payment #${payment.id}`}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(payment.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Method:</span> {payment.paymentMethod}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Amount:</span> ${payment.amount.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Date:</span> {formatDate(payment.paymentDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Order ID:</span> {payment.orderId}
        </p>
        {payment.notes && (
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold">Notes:</span><br />
            {payment.notes}
          </p>
        )}
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
          </DialogHeader>
          <PaymentForm
            payment={payment}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setIsLoading(true)
      const data = await getPayments()
      setPayments(data)
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePayment = async (newPayment: Omit<Payment, 'id'>) => {
    try {
      const createdPayment = await createPayment(newPayment)
      setPayments(prev => [...prev, createdPayment])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating payment:', error)
    }
  }

  const handleDeletePayment = async (paymentId: string) => {
    try {
      await deletePayment(paymentId)
      setPayments(prev => prev.filter(payment => payment.id !== paymentId))
    } catch (error) {
      console.error('Error deleting payment:', error)
    }
  }

  const handleUpdatePayment = async (updatedPayment: Payment) => {
    try {
      await updatePayment(updatedPayment)
      console.info(payments)
      setPayments(prev => prev.map(payment => 
        payment.id === updatedPayment.id ? updatedPayment : payment
      ))
      console.info(payments)
    } catch (error) {
      console.error('Error updating payment:', error)
    } 
  }

  const filterFields = [
    {
      name: 'paymentMethod',
      label: 'Payment Method',
      options: [
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'PayPal', value: 'PayPal' },
        { label: 'Bank Transfer', value: 'Bank Transfer' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Payment Date', value: 'paymentDate' },
    { label: 'Amount', value: 'amount' },
    { label: 'Payment Method', value: 'paymentMethod' },
  ]

  const defaultPayment = {
    paymentMethod: '',
    amount: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    orderId: '',
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <DataListPage<Payment>
        title="Payments"
        items={payments}
        renderItem={(payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onDelete={handleDeletePayment}
            onUpdate={handleUpdatePayment}
          />
        )}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search payments..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['paymentMethod', 'notes']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Payment</DialogTitle>
          </DialogHeader>
          <PaymentForm
            payment={defaultPayment}
            onSubmit={handleCreatePayment}
            submitLabel="Create Payment"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}