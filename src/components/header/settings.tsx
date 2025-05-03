import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserContextType } from "@/context/user-context"

interface SettingsProps {
  auth: UserContextType
  navigate: (path: string) => void
}

export function Settings({ auth, navigate }: SettingsProps) {
  const userName = auth.user?.name || 'User'
  const userInitial = userName.charAt(0) || 'U'
  
  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {userInitial}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth.user?.email || ''}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
