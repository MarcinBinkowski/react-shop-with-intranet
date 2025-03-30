import Messages from './messages'
import Notifications from './notifications'
import {Settings} from './settings'
import { AuthActionsProps } from './types'

export function AuthActions({ auth, navigate}: AuthActionsProps) {
    console.log(auth)
    return auth.isAuthenticated ? (
        <>
        <Messages />
        <Notifications />
        <Settings 
          auth={auth}
          navigate={navigate}
        />
      </>
      ) : <></>
  }
