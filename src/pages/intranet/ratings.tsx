import { useState, useEffect } from 'react'
import { DataListPage } from '@/components/common/DataListPage'
import { DataCard } from '@/components/common/DataCard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createRating, deleteRating, getRatings, updateRating } from '@/api/ratings'
import { formatDate } from '@/lib/utils'

export interface Rating {
  id: string
  value: number
  comment?: string
  createdDate: string
  productId: number
  productName?: string
}

interface RatingFormProps {
  rating: Partial<Rating>
  onSubmit: (rating: Omit<Rating, 'id'>) => void
  submitLabel: string
}

function RatingForm({ rating, onSubmit, submitLabel }: RatingFormProps) {
  const [formData, setFormData] = useState<Omit<Rating, 'id'>>({
    value: rating.value || 1,
    comment: rating.comment || '',
    createdDate: rating.createdDate || new Date().toISOString(),
    productId: rating.productId || 0,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="value">Rating Value (1-5)</Label>
        <Input
          id="value"
          type="number"
          min={1}
          max={5}
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          maxLength={500}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productId">Product ID</Label>
        <Input
          id="productId"
          type="number"
          min={0}
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: parseInt(e.target.value) })}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

function RatingCard({ rating, onDelete, onUpdate }: { 
  rating: Rating
  onDelete: (id: string) => void
  onUpdate: (rating: Rating) => void 
}) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedRating: Omit<Rating, 'id'>) => {
    onUpdate({ ...updatedRating, id: rating.id })
    setIsEditing(false)
  }

  return (
    <>
      <DataCard
        title={`Rating for Product ${rating.productName || rating.productId}`}
        onEdit={() => setIsEditing(true)}
        onDelete={() => onDelete(rating.id)}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Value:</span> {rating.value}/5
        </p>
        {rating.comment && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Comment:</span> {rating.comment}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Created:</span> {formatDate(rating.createdDate)}
        </p>
      </DataCard>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rating</DialogTitle>
          </DialogHeader>
          <RatingForm
            rating={rating}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function RatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      setIsLoading(true)
      const data = await getRatings()
      setRatings(data)
    } catch (error) {
      console.error('Error fetching ratings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateRating = async (newRating: Omit<Rating, 'id'>) => {
    try {
      const createdRating = await createRating(newRating)
      setRatings(prev => [...prev, createdRating])
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Error creating rating:', error)
    }
  }

  const handleDeleteRating = async (ratingId: string) => {
    try {
      await deleteRating(ratingId)
      setRatings(prev => prev.filter(rating => rating.id !== ratingId))
    } catch (error) {
      console.error('Error deleting rating:', error)
    }
  }

  const handleUpdateRating = async (updatedRating: Rating) => {
    try {
      await updateRating(updatedRating)
      setRatings(prev => prev.map(rating => 
        rating.id === updatedRating.id ? updatedRating : rating
      ))
    } catch (error) {
      console.error('Error updating rating:', error)
    }
  }

  const filterFields = [
    {
      name: 'value',
      label: 'Rating',
      options: [
        { label: '1 Star', value: '1' },
        { label: '2 Stars', value: '2' },
        { label: '3 Stars', value: '3' },
        { label: '4 Stars', value: '4' },
        { label: '5 Stars', value: '5' },
      ]
    }
  ]

  const sortFields = [
    { label: 'Rating Value', value: 'value' },
    { label: 'Created Date', value: 'createdDate' },
    { label: 'Product ID', value: 'productId' },
  ]

  const defaultRating = {
    value: 5,
    comment: '',
    createdDate: new Date().toISOString(),
    productId: 0
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <DataListPage<Rating>
        title="Ratings"
        items={ratings}
        renderItem={(rating) => (
          <RatingCard 
            key={rating.id} 
            rating={rating} 
            onDelete={handleDeleteRating}
            onUpdate={handleUpdateRating}
          />
        )}
        filterFields={filterFields}
        sortFields={sortFields}
        searchPlaceholder="Search ratings..."
        onCreateClick={() => setIsCreateDialogOpen(true)}
        searchFields={['comment', 'productName']}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Rating</DialogTitle>
          </DialogHeader>
          <RatingForm
            rating={defaultRating}
            onSubmit={handleCreateRating}
            submitLabel="Create Rating"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}