import type { Invoice } from '@/types/invoice'

const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/Invoices'

// Get all invoices
export async function getInvoices() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch invoices:', error)
    return []
  }
}

// Create a new invoice
export async function createInvoice(invoice: Omit<Invoice, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(invoice)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create invoice:', error)
    throw error
  }
}

// Update an existing invoice
export async function updateInvoice(invoice: Invoice) {
  try {
    const response = await fetch(`${API_URL}/${invoice.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(invoice)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update invoice:', error)
    throw error
  }
}

// Delete an invoice
export async function deleteInvoice(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete invoice:', error)
    throw error
  }
}