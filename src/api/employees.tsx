import type { Employee } from '@/types/employee'

const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/employees'


export async function getEmployees() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    return []
  }
}

export async function createEmployee(employee: Omit<Employee, 'id'>) {
  console.info('Creating employee:', employee)
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(employee)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create employee:', error)
    throw error
  }
}

export async function updateEmployee(employee: Employee) {
  try {
    const response = await fetch(`${API_URL}/${employee.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(employee)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update employee:', error)
    throw error
  }
}

export async function deleteEmployee(id: string) {
  try {
    console.info('Deleting employee with ID:', id)
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete employee:', error)
    throw error
  }
}