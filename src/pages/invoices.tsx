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
  clientName: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate: string
  notes?: string
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    clientName: 'Acme Corp',
    amount: 1500.00,
    status: 'paid',
    dueDate: '2024-04-15',
    notes: 'Website development services'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    clientName: 'TechStart Inc',
    amount: 2800.50,
    status: 'pending',
    dueDate: '2024-04-30',
    notes: 'Monthly maintenance'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    clientName: 'Global Solutions',
    amount: 950.00,
    status: 'overdue',
    dueDate: '2024-03-25',
    notes: 'Consulting services'
  },
]

function InvoiceCard({ invoice, onDelete, onUpdate }: { 
  invoice: Invoice
  onDelete: (id: string) => void
  onUpdate: (invoice: Invoice) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedInvoice, setEditedInvoice] = useState(invoice)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedInvoice)
    setIsEditing(false)
  }

  const statusColors = {
    paid: 'text-green-600',
    pending: 'text-yellow-600',
    overdue: 'text-red-600'
  }

  return (
    <>
      <DataCard
        title={invoice.invoiceNumber}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(invoice.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Client:</span> {invoice.clientName}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Amount:</span> ${invoice.amount.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Due Date:</span>{' '}
          {new Date(invoice.dueDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Status:</span>{' '}
          <span className={statusColors[invoice.status]}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
        </p>
        {invoice.notes && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Notes:</span> {invoice.notes}
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
                onChange={(e) => setEditedInvoice({ ...editedInvoice, invoiceNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-client">Client Name</Label>
              <Input
                id="edit-client"
                value={editedInvoice.clientName}
                onChange={(e) => setEditedInvoice({ ...editedInvoice, clientName: e.target.value })}
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
                onChange={(e) => setEditedInvoice({ ...editedInvoice, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-due-date">Due Date</Label>
              <Input
                id="edit-due-date"
                type="date"
                value={editedInvoice.dueDate}
                onChange={(e) => setEditedInvoice({ ...editedInvoice, dueDate: e.target.value })}
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={editedInvoice.notes || ''}
                onChange={(e) => setEditedInvoice({ ...editedInvoice, notes: e.target.value })}
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
    invoiceNumber: \`INV-\${new Date().getFullYear()}-\${String(mockInvoices.length + 1).padStart(3, '0')}\`,
    clientName: '',
    amount: 0,
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0],
  })

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    const invoice = {
      ...newInvoice,
      id: Math.random().toString(36).substr(2, 9)
    }
    setInvoices([...invoices, invoice])
    setIsCreateDialogOpen(false)
    setNewInvoice({
      invoiceNumber: \`INV-\${new Date().getFullYear()}-\${String(invoices.length + 2).padStart(3, '0')}\`,
      clientName: '',
      amount: 0,
      status: 'pending',
      dueDate: new Date().toISOString().split('T')[0],
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
        { label: 'Paid', value: 'paid' },
        { label: 'Pending', value: 'pending' },
        { label: 'Overdue', value: 'overdue' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Invoice Number', value: 'invoiceNumber' },
    { label: 'Client Name', value: 'clientName' },
    { label: 'Amount', value: 'amount' },
    { label: 'Due Date', value: 'dueDate' },
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
        searchFields={['invoiceNumber', 'clientName']}
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
                onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-client">Client Name</Label>
              <Input
                id="create-client"
                value={newInvoice.clientName}
                onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
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
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-due-date">Due Date</Label>
              <Input
                id="create-due-date"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-notes">Notes</Label>
              <Textarea
                id="create-notes"
                value={newInvoice.notes || ''}
                onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
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