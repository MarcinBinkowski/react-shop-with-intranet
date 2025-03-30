import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { ShowMenuButtonProps } from './types'


function ShowMenuButton({ onMenuClick, title }: ShowMenuButtonProps) {
  return (
         <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>
  )
}

export default ShowMenuButton