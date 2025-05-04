import type { Payment } from '@/pages/intranet/payments'

export interface Payment {
    id: string
    paymentMethod: string
    amount: number
    paymentDate: string
    transactionId?: string
    notes?: string
    orderId: string
  }


const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/Payments'

export async function getPayments() {
  try {
    const response = await fetch(API_URL)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return []
  }
}

export async function createPayment(payment: Omit<Payment, 'id'>) {
  try {
    console.log('Creating payment:', payment)
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(payment)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create payment:', error)
    throw error
  }
}

export async function updatePayment(payment: Payment) {
  try {
    const response = await fetch(`${API_URL}/${payment.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(payment)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update payment:', error)
    throw error
  }
}

export async function deletePayment(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete payment:', error)
    throw error
  }
}
export async function getUserPayments(customerName: string) {
  try {
    const response = await fetch(`${API_URL}/user/${customerName}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user payments:', error)
    return []
  }
}