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
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4">
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
    </>

  )
}


