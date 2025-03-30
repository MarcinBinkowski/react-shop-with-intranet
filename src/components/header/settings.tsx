import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import  { useCallback } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {  SettingsProps } from "./types";


export function Settings({ auth, navigate }: SettingsProps) {
    const handleLogout = useCallback(() => {
        auth.logout()
        navigate('/')
      }, [auth, navigate])
    return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>{auth.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {auth.user.username}
                  {auth.isAdmin && <span className="ml-2 text-xs text-primary">(Admin)</span>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
    )
  }
