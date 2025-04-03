import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { DataTableCardConfig } from "./types"

interface MobileCardProps<T> {
  row: T
  config: DataTableCardConfig<T>
  isSelected: boolean
  onToggleSelect: () => void
}

export function MobileCard<T>({ row, config, isSelected, onToggleSelect }: MobileCardProps<T>) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.primary.avatar?.(row)}
            <div>
              <div className="font-medium">{config.primary.title(row)}</div>
              {config.primary.subtitle && (
                <div className="text-sm text-muted-foreground">
                  {config.primary.subtitle(row)}
                </div>
              )}
            </div>
          </div>
          <Checkbox checked={isSelected} onCheckedChange={onToggleSelect} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {config.fields.map((field, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{field.label}:</span>
            <span className={field.className}>{field.value(row)}</span>
          </div>
        ))}
      </CardContent>
      {config.actions && config.actions.length > 0 && (
        <CardFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              {config.actions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(row)}
                  className={action.variant}
                >
                  {action.icon}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      )}
    </Card>
  )
}