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

function InvoiceCard({ invoice, onDelete, onUpdate }: { 
  invoice: Invoice
  onDelete: (id: string) => void
  onUpdate: (invoice: Invoice) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedInvoice, setEditedInvoice] = useState(invoice)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onUpdate(editedInvoice)
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-invoice-number">Invoice Number</Label>
              <Input
                id="edit-invoice-number"
                value={editedInvoice.invoiceNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedInvoice({ ...editedInvoice, invoiceNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-customer">Customer Name</Label>
              <Input
                id="edit-customer"
                value={editedInvoice.customerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedInvoice({ ...editedInvoice, customerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedInvoice.status}
                onValueChange={(value: Invoice['status']) => setEditedInvoice({ ...editedInvoice, status: value })}
              >
                <SelectTrigger id="edit-status">
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
              <Label htmlFor="edit-issue-date">Issue Date</Label>
              <Input
                id="edit-issue-date"
                type="date"
                value={editedInvoice.issueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedInvoice({ ...editedInvoice, issueDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-due-date">Due Date</Label>
              <Input
                id="edit-due-date"
                type="date"
                value={editedInvoice.dueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedInvoice({ ...editedInvoice, dueDate: e.target.value })}
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
                value={editedInvoice.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedInvoice({ ...editedInvoice, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={editedInvoice.notes || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedInvoice({ ...editedInvoice, notes: e.target.value })}
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

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(mockInvoices.length + 1).padStart(3, '0')}`,
    customerName: '',
    status: 'draft',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 0
  })

  const handleCreateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const invoice = {
      ...newInvoice,
      id: Math.random().toString(36).substr(2, 9)
    }
    setInvoices([...invoices, invoice])
    setIsCreateDialogOpen(false)
    setNewInvoice({
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 2).padStart(3, '0')}`,
      customerName: '',
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: 0
    })
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
          <form onSubmit={handleCreateInvoice} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-invoice-number">Invoice Number</Label>
              <Input
                id="create-invoice-number"
                value={newInvoice.invoiceNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-customer">Customer Name</Label>
              <Input
                id="create-customer"
                value={newInvoice.customerName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-status">Status</Label>
              <Select
                value={newInvoice.status}
                onValueChange={(value: Invoice['status']) => setNewInvoice({ ...newInvoice, status: value })}
              >
                <SelectTrigger id="create-status">
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
              <Label htmlFor="create-issue-date">Issue Date</Label>
              <Input
                id="create-issue-date"
                type="date"
                value={newInvoice.issueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvoice({ ...newInvoice, issueDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-due-date">Due Date</Label>
              <Input
                id="create-due-date"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
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
                value={newInvoice.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-notes">Notes</Label>
              <Textarea
                id="create-notes"
                value={newInvoice.notes || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                placeholder="Add notes here..."
              />
            </div>
            <Button type="submit" className="w-full">
              Create Invoice
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
