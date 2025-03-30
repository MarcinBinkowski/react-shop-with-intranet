import Messages from './messages'
import Notifications from './notifications'
import { AuthActionsProps } from './types'

export function AuthActions({ auth }: AuthActionsProps) {
    return (
        {auth ? (
          <>
            <Messages />
            <Notifications />
          </>
        ) : (
          <></>
        )})
  }
