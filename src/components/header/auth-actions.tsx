import Messages from './messages'
import Notifications from './notifications'
import {Settings} from './settings'
import { AuthActionsProps } from './types'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'

export function AuthActions({ auth, navigate}: AuthActionsProps) {
    console.log(auth)
    return auth.user ? (
        <>
            <Messages />
            <Notifications />
            <Settings 
                auth={auth}
                navigate={navigate}
            />
        </>
    ) : (
        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/login')}
        >
            <LogIn className="mr-2 h-4 w-4" />
            Login
        </Button>
    )
}
