import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface FilterOption {
  label: string
  value: string
}

interface SortField {
  label: string
  value: string
}

interface DataListPageProps<T> {
  title: string
  items: T[]
  renderItem: (item: T) => React.ReactNode
  filterFields: {
    name: string
    label: string
    options: FilterOption[]
  }[]
  sortFields: SortField[]
  searchPlaceholder?: string
  onCreateClick: () => void
  searchFields: (keyof T)[]
}

export function DataListPage<T extends { id: string }>({
  title,
  items,
  renderItem,
  filterFields,
  sortFields,
  searchPlaceholder = "Search...",
  onCreateClick,
  searchFields
}: DataListPageProps<T>) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<string>(sortFields[0]?.value || '')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(filterFields.map(field => [field.name, 'all']))
  )

  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter(item => {
        const matchesSearch = search === '' || searchFields.some(field => 
          String(item[field]).toLowerCase().includes(search.toLowerCase())
        )
        const matchesFilters = filterFields.every(field => 
          filters[field.name] === 'all' || 
          String(item[field.name as keyof T]) === filters[field.name]
        )

        return matchesSearch && matchesFilters
      })
      .sort((a, b) => {
        const aValue = String(a[sortBy as keyof T])
        const bValue = String(b[sortBy as keyof T])
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        }
        return aValue < bValue ? 1 : -1
      })
  }, [items, search, sortBy, sortOrder, filters, searchFields, filterFields])

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button onClick={onCreateClick}>
          Add New {title.slice(0, -1)} 
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filterFields.map(field => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                <Select
                  value={filters[field.name]}
                  onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, [field.name]: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Filter by ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Show All</SelectItem>
                    {field.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortFields.map(field => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={sortOrder}
                  onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedItems.map(item => renderItem(item))}
      </div>
    </div>
  )
} 