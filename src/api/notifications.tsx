import type { Notification } from '@/pages/intranet/notifications'

const fetchOptions = {
  headers: { 
    'Content-Type': 'application/json' 
  }
}
const API_URL = '/api/Notifications'

export async function getNotifications(userId?: number) {
  try {
    const url = userId ? `${API_URL}?userId=${userId}` : API_URL
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
    return []
  }
}

export async function createNotification(notification: Omit<Notification, 'id'>) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify(notification)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to create notification:', error)
    throw error
  }
}

export async function updateNotification(notification: Notification) {
  try {
    const response = await fetch(`${API_URL}/${notification.id}`, {
      method: 'PUT',
      ...fetchOptions,
      body: JSON.stringify(notification)
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to update notification:', error)
    throw error
  }
}

export async function deleteNotification(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return true
  } catch (error) {
    console.error('Failed to delete notification:', error)
    throw error
  }
}

export async function markNotificationAsRead(id: number) {
  try {
    const response = await fetch(`${API_URL}/markasread/${id}`, {
      method: 'PATCH'
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    throw error
  }
}

export async function getUnreadNotifications(userId: number) {
  try {
    const response = await fetch(`${API_URL}/unread/${userId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch unread notifications:', error)
    return []
  }
}