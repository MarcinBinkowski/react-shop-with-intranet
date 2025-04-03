import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { DataCardProps } from "./types"


export function DataCard({ title, value, description, icon, className }: DataCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          {icon && <div className="text-muted-foreground">{icon}</div>}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

