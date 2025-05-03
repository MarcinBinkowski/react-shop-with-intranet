import type { Product } from '@/types/product'

// Simple helper for common fetch options
const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/Products'

// Get all products
export async function getProducts() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

// Create a new product
export async function createProduct(product: Omit<Product, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(product)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create product:', error)
    throw error
  }
}

// Update an existing product
export async function updateProduct(product: Product) {
  try {
    const response = await fetch(`${API_URL}/${product.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(product)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update product:', error)
    throw error
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete product:', error)
    throw error
  }
}