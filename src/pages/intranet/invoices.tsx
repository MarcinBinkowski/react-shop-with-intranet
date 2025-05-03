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
import { createInvoice, deleteInvoice, getInvoices, updateInvoice } from '@/api/invoices'
import { formatDate, formatDateForForm } from '@/lib/utils'

export interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  issueDate: string
  dueDate: string
  amount: number
  notes?: string
}


interface InvoiceFormProps {
  invoice: Partial<Invoice>
  onSubmit: (invoice: Omit<Invoice, 'id'>) => void
  submitLabel: string
}

function InvoiceForm({ invoice, onSubmit, submitLabel }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: invoice.invoiceNumber || '',
    customerName: invoice.customerName || '',
    status: invoice.status || 'draft',
    issueDate: formatDateForForm(invoice.issueDate),
    dueDate: formatDateForForm(invoice.dueDate),
        amount: invoice.amount || 0,
    notes: invoice.notes
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="invoice-number">Invoice Number</Label>
        <Input
          id="invoice-number"
          value={formData.invoiceNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, invoiceNumber: e.target.value })}
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
          onValueChange={(value: Invoice['status']) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="issue-date">Issue Date</Label>
        <Input
          id="issue-date"
          type="date"
          value={formData.issueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, issueDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="due-date">Due Date</Label>
        <Input
          id="due-date"
          type="date"
          value={formData.dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, dueDate: e.target.value })}
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

function InvoiceCard({ invoice, onDelete, onUpdate }: { 
  invoice: Invoice
  onDelete: (id: string) => void
  onUpdate: (invoice: Invoice) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedInvoice: Omit<Invoice, 'id'>) => {
    onUpdate({ ...updatedInvoice, id: invoice.id })
    setIsEditing(false)
  }

  const statusColors = {
    draft: 'text-slate-600',
    sent: 'text-blue-600',
    paid: 'text-green-600',
    overdue: 'text-red-600',
    cancelled: 'text-red-600'
  }

  return (
    <>
      <DataCard
        title={invoice.invoiceNumber}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(invoice.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Customer:</span> {invoice.customerName}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Status:</span>{' '}
          <span className={statusColors[invoice.status]}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Issue Date:</span>{' '}
          {formatDate(invoice.issueDate)}        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Due Date:</span>{' '}
          {formatDate(invoice.dueDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Amount:</span> ${invoice.amount.toFixed(2)}
        </p>
        {invoice.notes && (
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold">Notes:</span><br />
            {invoice.notes}
          </p>
        )}
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm
            invoice={invoice}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      setIsLoading(true)
      const data = await getInvoices()
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateInvoice = async (newInvoice: Omit<Invoice, 'id'>) => {
    try {
      setIsLoading(true)
      const createdInvoice = await createInvoice(newInvoice)
      setInvoices(prev => [...prev, createdInvoice])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating invoice:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteInvoice = async (invoiceId: string) => {
    try {
      await deleteInvoice(invoiceId)
      setInvoices(prev => prev.filter(invoice => invoice.id !== invoiceId))
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  const handleUpdateInvoice = async (updatedInvoice: Invoice) => {
    try {
      await updateInvoice(updatedInvoice)
      setInvoices(prev => prev.map(invoice => 
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      ))
    } catch (error) {
      console.error('Error updating invoice:', error)
    }
  }


  const filterFields = [
    {
      name: 'status',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
        { label: 'Paid', value: 'paid' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Cancelled', value: 'cancelled' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Invoice Number', value: 'invoiceNumber' },
    { label: 'Customer Name', value: 'customerName' },
    { label: 'Issue Date', value: 'issueDate' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Amount', value: 'amount' },
  ]

  const defaultInvoice = {
    invoiceNumber: `${new Date().getFullYear()}-`,
    customerName: '',
    status: 'draft' as const,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 0
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <DataListPage<Invoice>
        title="Invoices"
        items={invoices}
        renderItem={(invoice) => (
          <InvoiceCard 
            key={invoice.id} 
            invoice={invoice}
            onDelete={handleDeleteInvoice}
            onUpdate={handleUpdateInvoice}
          />
        )}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search invoices..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['invoiceNumber', 'customerName']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm
            invoice={defaultInvoice}
            onSubmit={handleCreateInvoice}
            submitLabel="Create Invoice"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
