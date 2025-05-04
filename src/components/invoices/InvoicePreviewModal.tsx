import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PDFViewer } from '@react-pdf/renderer'
import { InvoicePDF } from './InvoicePDF'
import type { Invoice } from '@/pages/intranet/invoices'

export function InvoicePreviewModal({ 
  invoice, 
  isOpen, 
  onClose 
}: { 
  invoice: Invoice
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] h-[800px]">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
        </DialogHeader>
        <PDFViewer width="100%" height="100%" className="rounded-md">
          <InvoicePDF invoice={invoice} />
        </PDFViewer>
      </DialogContent>
    </Dialog>
  )
}