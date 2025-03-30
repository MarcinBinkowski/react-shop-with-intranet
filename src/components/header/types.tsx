// import { UserContextType } from '../../context/UserContext'
import { useContext } from 'react';
import { UserContextType } from '@/context/UserContext';

export interface NavigationHandlers {
    handleLogout: () => void
    handleProfileClick: () => void
    handleSettingsClick: () => void
  }
  
export interface AppHeaderProps {
    title: string
    onMenuClick: () => void
    auth: UserContextType
    navigationHandlers: NavigationHandlers
  }
export interface ShowMenuButtonProps {
    onMenuClick: () => void
  }

export interface MessageItemProps {
    key: number
    name: string
    message: string
    time: string
}
export interface NotificationItemProps {
    key: number
    title: string
    desc: string
    time: string
}

export  interface AuthActionsProps {
    auth: UserContextType
    navigationHandlers: NavigationHandlers
  }

export interface SettingsProps {
    auth: UserContextType
    navigationHandlers: {
      handleLogout: () => void
      handleProfileClick: () => void
      handleSettingsClick: () => void
    }
  }