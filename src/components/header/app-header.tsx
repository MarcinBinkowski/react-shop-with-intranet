"use client"

import { Bell, Search, Menu, MessageSquare, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
// import { ThemeToggle } from "@/components/theme-toggle"
import { useUser } from "@/context/user-context"
import { useNavigate } from "react-router-dom"
import {ShowMenuButton} from "./show-menu-button"
import { AppHeaderProps } from "./types"
import {AuthActions} from "./auth-actions"



export function AppHeader({ 
  title, 
  onMenuClick, 
  auth,
  navigate 
}: AppHeaderProps) {


  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <div className="flex items-center gap-4">
        <ShowMenuButton onMenuClick={onMenuClick} />
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <ModeToggle />
        <AuthActions 
          auth={auth} 
          navigate={navigate}
        />
      </div>
    </header>
  )
}


