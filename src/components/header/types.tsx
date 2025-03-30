// import { UserContextType } from '../../context/UserContext'
import { useContext } from 'react';
import { UserContextType } from '../../context/UserContext';

export interface AppHeaderProps {
    auth: UserContextType
    title: string
    // showSearch?: boolean
    onMenuClick: () => void
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

export interface AuthActionsProps {
    auth: UserContextType
  }

export interface SettingProps{
    auth: UserContextType
}