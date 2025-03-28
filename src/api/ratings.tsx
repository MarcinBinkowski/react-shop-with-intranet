import type { Rating } from '@/pages/intranet/ratings'

const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/Ratings'

export async function getRatings() {
  try {
    const response = await fetch(API_URL)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch ratings:', error)
    return []
  }
}

export async function createRating(rating: Omit<Rating, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(rating)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create rating:', error)
    throw error
  }
}

export async function updateRating(rating: Rating) {
  try {
    const response = await fetch(`${API_URL}/${rating.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(rating)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update rating:', error)
    throw error
  }
}

export async function deleteRating(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete rating:', error)
    throw error
  }
}
export async function getAverageRating(productId: number) {
    try {
      const response = await fetch(`${API_URL}/product/${productId}/average`)
      if (!response.ok) {
        throw new Error('Failed to fetch average rating')
      }
      return await response.json()
    } catch (error) {
      console.error('Failed to fetch average rating:', error)
      return {
        productId,
        averageRating: 0
      }
    }
}