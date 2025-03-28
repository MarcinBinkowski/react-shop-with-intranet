import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { ShowMenuButtonProps } from './types'


export function ShowMenuButton({ onMenuClick }: ShowMenuButtonProps) {
  return (
         <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu />
        </Button>
      </div>
  )
}