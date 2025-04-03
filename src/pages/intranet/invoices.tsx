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
  items: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  total: number
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
    items: [
      { description: 'Web Development Services', quantity: 1, unitPrice: 1500, total: 1500 },
      { description: 'Hosting (Monthly)', quantity: 12, unitPrice: 29.99, total: 359.88 }
    ],
    subtotal: 1859.88,
    tax: 371.98,
    total: 2231.86,
    notes: 'Thank you for your business!'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customerName: 'Jane Doe',
    status: 'sent',
    issueDate: '2024-04-01',
    dueDate: '2024-05-01',
    items: [
      { description: 'UI/UX Design', quantity: 1, unitPrice: 800, total: 800 }
    ],
    subtotal: 800,
    tax: 160,
    total: 960
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
        <div className="text-sm text-muted-foreground mt-2">
          <p className="font-semibold">Items:</p>
          <ul className="list-disc list-inside pl-2">
            {invoice.items.map((item, index) => (
              <li key={index}>
                {item.description} - {item.quantity}x ${item.unitPrice.toFixed(2)} = ${item.total.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          <p><span className="font-semibold">Subtotal:</span> ${invoice.subtotal.toFixed(2)}</p>
          <p><span className="font-semibold">Tax:</span> ${invoice.tax.toFixed(2)}</p>
          <p className="font-semibold">Total: ${invoice.total.toFixed(2)}</p>
        </div>
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
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0
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
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
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
    { label: 'Total', value: 'total' },
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
