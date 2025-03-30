export interface AppHeaderProps {
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