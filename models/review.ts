import { BookDoc } from 'models/book'
import { CommentDoc } from 'models/comment'
import { UserDoc } from 'models/user'
import { Document, Model, model, Schema } from 'mongoose'

interface ReviewAttrs {
  book: BookDoc
  user: UserDoc
  title: string
  description: string
  rating: number
  upvotes: UserDoc[] | null
  comments: CommentDoc[] | null
}

interface ReviewDoc extends Document, ReviewAttrs {
  id: string
  approved: boolean
}

interface ReviewModel extends Model<ReviewDoc> {
  build: (attrs: ReviewAttrs) => ReviewDoc
}

const reviewSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    approved: {
      type: Boolean,
      default: false
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  }
)

reviewSchema.statics.build = (attrs: ReviewAttrs) => new Review(attrs)

export const Review = model<ReviewDoc, ReviewModel>('Review', reviewSchema)
