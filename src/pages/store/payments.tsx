import { useState, useEffect } from 'react'
import { useUser } from '@/context/user-context'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { getUserPayments } from '@/api/payments'

interface Payment {
  id: string
  paymentMethod: string
  amount: number
  paymentDate: string
  transactionId?: string
  notes?: string
  orderId: string
  orderNumber: string
}

function PaymentCard({ payment }: { payment: Payment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Payment for Order #{payment.orderNumber}</span>
          <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">
            {payment.paymentMethod}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Payment Date:</span> {formatDate(payment.paymentDate)}
        </p>
        {payment.transactionId && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Transaction ID:</span> {payment.transactionId}
          </p>
        )}
        <p className="text-lg font-semibold">
          Amount: ${payment.amount.toFixed(2)}
        </p>
        {payment.notes && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Notes:</span> {payment.notes}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default function StorePaymentsPage() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPayments()
  }, [user, navigate])

  const fetchPayments = async () => {
    if (!user?.name) return
    
    try {
      setIsLoading(true)
      setError(null)
      const data = await getUserPayments(user.name)
      setPayments(data)
    } catch (error) {
      console.error('Failed to fetch payments:', error)
      setError('Failed to load payments. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">My Payments</h1>
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">My Payments</h1>
        <div className="text-center text-destructive">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Payments</h1>
      
      {payments.length === 0 ? (
        <div className="text-center text-muted-foreground">
          You haven't made any payments yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map(payment => (
            <PaymentCard 
              key={payment.id} 
              payment={payment}
            />
          ))}
        </div>
      )}
    </div>
  )
}