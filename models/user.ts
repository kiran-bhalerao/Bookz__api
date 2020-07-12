import { BookDoc } from 'models/book'
import { Document, Model, model, Schema } from 'mongoose'
import { Role } from 'types/graph'
import { Password } from 'utils/Password'

interface UserAttrs {
  email: string
  password: string
  name: string
  photo: string | null
  about: string | null
  wishlist: BookDoc[] | null
  role?: Role
}

export interface UserDoc extends Document, UserAttrs {
  id: string
  role: Role
}

interface UserModel extends Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'MEMBER', 'CONTRIBUTOR'],
      default: 'MEMBER'
    },
    photo: String,
    about: String,
    wishlist: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Book'
        }
      ]
    }
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', function (done) {
  if (this.isModified('password')) {
    const hashed = Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.statics.build = (attrs: UserAttrs) => new UserModel(attrs)

export const UserModel = model<UserDoc, UserModel>('User', userSchema)
