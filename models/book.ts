import { UserDoc } from 'models/user'
import { Document, Model, model, Schema } from 'mongoose'
import { Seller } from 'types/graph'

interface BookAttrs {
  title: string
  user: UserDoc
  description: string | null
  author: string | null
  publisher: string | null
  photos: string[] | null
  pages: number | null
  language: string | null
  isbn10: string | null
  isbn13: string | null
  publishDate: string | null
  sellers: Seller[] | null
}

export interface BookDoc extends Document, BookAttrs {
  id: string
  verified: boolean
}

interface BookModel extends Model<BookDoc> {
  build: (attrs: BookAttrs) => BookDoc
}

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    author: String,
    publisher: String,
    photos: [String],
    pages: Number,
    languages: String,
    isbn10: String,
    isbn13: String,
    publishDate: Date,
    verified: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    sellers: {
      type: [
        new Schema({
          name: String,
          url: String,
          price: String
        })
      ]
    }
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

bookSchema.statics.build = (attrs: BookAttrs) => new Book(attrs)

export const Book = model<BookDoc, BookModel>('Book', bookSchema)
