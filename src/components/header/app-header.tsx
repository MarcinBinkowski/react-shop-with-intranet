"use client"
import { ModeToggle } from "@/components/mode-toggle"
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
    <div className="mx-auto w-full">
<div className="sticky top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
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
        </div>
      </div>
    </div>
  )
}