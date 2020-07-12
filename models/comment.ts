import { Document, Model, model, Schema } from 'mongoose'
import { UserDoc } from 'src/models/user'

interface CommentAttrs {
  comment: string
  user: UserDoc
  likes: UserDoc[]
  dislikes: UserDoc[]
}

export interface CommentDoc extends Document, CommentAttrs {}

interface CommentModel extends Model<CommentDoc> {
  build: (attrs: CommentAttrs) => CommentDoc
}

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
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

commentSchema.statics.build = (attrs: CommentAttrs) => new Comment(attrs)

export const Comment = model<CommentDoc, CommentModel>('Comment', commentSchema)
