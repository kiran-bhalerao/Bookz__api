import { Document, Model, model, Schema } from 'mongoose'

interface ScoreAttrs {
  xp: number
  reason: string
}

export interface ScoreDoc extends Document, ScoreAttrs {
  id: string
}

interface ScoreModel extends Model<ScoreDoc> {
  build: (attrs: ScoreAttrs) => ScoreDoc
}

const ScoreSchema = new Schema(
  {
    xp: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: (_, doc) => {
        doc.id = doc._id
        delete doc._id
        delete doc.__v
      }
    }
  }
)

ScoreSchema.statics.build = (attrs: ScoreAttrs) => new ScoreModel(attrs)

export const ScoreModel = model<ScoreDoc, ScoreModel>('Score', ScoreSchema)
