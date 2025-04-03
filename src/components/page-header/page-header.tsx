import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormField {
  id: string
  label: string
  type: "text" | "email" | "number" | "select"
  placeholder?: string
  options?: { label: string; value: string }[]
  className?: string
}

interface FormFieldsProps {
  fields: FormField[]
  layout?: "single" | "double"
}

function FormFields({ fields, layout = "single" }: FormFieldsProps) {
  const renderField = (field: FormField) => (
    <div key={field.id} className={`grid gap-2 ${field.className || ""}`}>
      <Label htmlFor={field.id}>{field.label}</Label>
      {field.type === "select" ? (
        <Select>
          <SelectTrigger id={field.id}>
            <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
        />
      )}
    </div>
  )

  if (layout === "double") {
    const pairs = []
    for (let i = 0; i < fields.length; i += 2) {
      pairs.push(
        <div key={i} className="grid grid-cols-2 gap-4">
          {renderField(fields[i])}
          {fields[i + 1] && renderField(fields[i + 1])}
        </div>
      )
    }
    return <div className="grid gap-4 py-4">{pairs}</div>
  }

  return <div className="grid gap-4 py-4">{fields.map(renderField)}</div>
}

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    icon?: LucideIcon
    dialog?: {
      title: string
      description: string
      fields: FormField[]
      layout?: "single" | "double"
      submitLabel?: string
    }
  }
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </Button>
          </DialogTrigger>
          {action.dialog && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{action.dialog.title}</DialogTitle>
                <DialogDescription>
                  {action.dialog.description}
                </DialogDescription>
              </DialogHeader>
              <FormFields
                fields={action.dialog.fields}
                layout={action.dialog.layout}
              />
              <DialogFooter>
                <Button type="submit">
                  {action.dialog.submitLabel || "Submit"}
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      )}
    </div>
  )
} 