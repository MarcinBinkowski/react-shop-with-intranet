import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export function ViewSwitcher() {
    const navigate = useNavigate()
    const location = useLocation()
  
    const isInIntranet = location.pathname.startsWith('/intranet')
  
    const handleSwitch = () => {
      if (isInIntranet) {
        navigate('/')
      } else {
        navigate('/intranet')
      }
    }
  
    return (
      <Button onClick={handleSwitch}>
        {isInIntranet ? 'View Store' : 'View Intranet'}
      </Button>
    )
} 