import type { User } from '@/types/user'

// Simple helper for common fetch options
const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/Users'


export async function getUsers() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }
}

export async function createUser(user: Omit<User, 'id'>) {
  console.info('Creating user:', user)
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export async function updateUser(user: User) {
  try {
    const response = await fetch(`${API_URL}/${user.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

export async function deleteUser(id: string) {
  try {
    console.info('Deleting user with ID:', id)
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete user:', error)
    throw error
  }
}