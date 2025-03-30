import Messages from './messages'
import Notifications from './notifications'
import { AuthActionsProps } from './types'

export function AuthActions({ auth }: AuthActionsProps) {
    if (!auth.isAuthenticated) {
      return null
    }
  
    return (
      <div className="flex items-center gap-2">
        <Messages />
        <Notifications />
      </div>
    )
  }
