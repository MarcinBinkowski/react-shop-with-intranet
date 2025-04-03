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

interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  issueDate: string
  dueDate: string
  amount: number
  notes?: string
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customerName: 'John Smith',
    status: 'paid',
    issueDate: '2024-03-15',
    dueDate: '2024-04-14',
    amount: 2231.86,
    notes: 'Thank you for your business!'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerName: 'Jane Doe',
    status: 'sent',
    issueDate: '2024-04-01',
    dueDate: '2024-05-01',
    amount: 960.00
  },
]

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
    issueDate: invoice.issueDate || new Date().toISOString().split('T')[0],
    dueDate: invoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
          {new Date(invoice.issueDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Due Date:</span>{' '}
          {new Date(invoice.dueDate).toLocaleDateString()}
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
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateInvoice = (newInvoice: Omit<Invoice, 'id'>) => {
    const invoice = {
      ...newInvoice,
      id: Math.random().toString(36).substr(2, 9)
    }
    setInvoices([...invoices, invoice])
    setIsCreateDialogOpen(false)
  }

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId))
  }

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    ))
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
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
    customerName: '',
    status: 'draft' as const,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 0
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
