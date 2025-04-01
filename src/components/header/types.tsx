// import { UserContextType } from '../../context/UserContext'
import { useContext } from 'react';
import { UserContextType } from '../../context/user-context';
import { NavigateFunction } from 'react-router-dom';

  
export interface AppHeaderProps {
    title: string
    onMenuClick: () => void
    auth: UserContextType
    navigate: NavigateFunction
  }
export interface ShowMenuButtonProps {
    onMenuClick: () => void
  }

export interface MessageItemProps {
    id: string
    name: string
    message: string
    time: string
}
export interface NotificationItemProps {
    id: string
    title: string
    description: string
    time: string
  }

export  interface AuthActionsProps {
    auth: UserContextType,
    navigate: NavigateFunction
  }

export interface SettingsProps {
    auth: UserContextType
    navigate: NavigateFunction
  }