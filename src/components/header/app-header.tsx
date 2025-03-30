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
import { useUser } from "@/context/user-context"
import { useNavigate } from "react-router-dom"
import ShowMenuButton from "./show-menu-button"
import { AppHeaderProps } from "./types"



export function AppHeader({onMenuClick}:AppHeaderProps) {
  // const { user, logout, isAuthenticated } = useUser()
  // const navigate = useNavigate()

  // const handleLogin = () => {
  //   navigate("/login")
  // }

  // const handleLogout = () => {
  //   logout()
  //   navigate("/")

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <ShowMenuButton onMenuClick={onMenuClick} title="Hide menu" />
    </header>
  )
}


