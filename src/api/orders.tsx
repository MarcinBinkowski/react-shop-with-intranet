import type { Order } from '@/pages/intranet/orders'

const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/orders'

export async function getOrders() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }
}

export async function createOrder(order: Omit<Order, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(order)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create order:', error)
    throw error
  }
}

export async function updateOrder(order: Order) {
  try {
    const response = await fetch(`${API_URL}/${order.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(order)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update order:', error)
    throw error
  }
}

export async function deleteOrder(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete order:', error)
    throw error
  }
}