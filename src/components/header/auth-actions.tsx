import React from 'react'
import Messages from './messages'
import Notifications from './notifications'

import { UserContextType } from '@context/user-context'

export default function AuthActions(auth: UserContextType) {
  return (
    {auth.isAuthenticated ? (
      <>
        <Messages />
        <Notifications />
      </>
    ) : (
      <></>
    )}
  )
}
