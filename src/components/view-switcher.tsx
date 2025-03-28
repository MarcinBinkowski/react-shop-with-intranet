import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useAdmin } from '@/contexts/admin-context'

export function ViewSwitcher() {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => {
        if (true) {
          navigate('/')
        } else {
          navigate('/intranet')
        }
      }}
    >
      {true ? 'View Store' : 'View Admin Panel'}
    </Button>
  )
}