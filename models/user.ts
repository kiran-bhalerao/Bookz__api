import { BookDoc } from 'models/book'
import { ScoreDoc } from 'models/score'
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
  scores?: ScoreDoc[]
  role?: Role
}

export interface UserDoc extends Document, UserAttrs {
  id: string
  role: Role
  scores: ScoreDoc[]
  streak: {
    start: string
    active: string
  }
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
    phone: {
      type: String // must be verified
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'MEMBER', 'CONTRIBUTOR'],
      default: 'MEMBER'
    },
    streak: {
      start: {
        type: Date,
        default: Date.now
      },
      active: {
        type: Date,
        default: Date.now
      }
    },
    photo: String,
    about: String,
    scores: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Score'
        }
      ],
      default: []
    },
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
