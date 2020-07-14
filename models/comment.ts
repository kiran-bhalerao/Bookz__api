import { UserDoc } from 'models/user'
import { Document, Model, model, Schema } from 'mongoose'

interface CommentAttrs {
  comment: string
  bookId: string
  user: UserDoc
  reviewId: string
  likes: UserDoc[]
  dislikes: UserDoc[]
}

export interface CommentDoc extends Document, CommentAttrs {
  id: string
}

interface CommentModel extends Model<CommentDoc> {
  build: (attrs: CommentAttrs) => CommentDoc
}

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    bookId: Schema.Types.ObjectId,
    reviewId: Schema.Types.ObjectId,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

commentSchema.statics.build = (attrs: CommentAttrs) => new CommentModel(attrs)

export const CommentModel = model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
)
