import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DataCardProps {
  title: string
  onEdit?: () => void
  onDelete?: () => void
  children: ReactNode
}

export function DataCard({ title, onEdit, onDelete, children }: DataCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {children}
          {(onEdit || onDelete) && (
            <div className="flex gap-2 pt-4">
              {onEdit && (
                <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="destructive" size="sm" className="flex-1" onClick={onDelete}>
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 