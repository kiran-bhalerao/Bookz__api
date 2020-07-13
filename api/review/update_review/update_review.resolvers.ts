import { Review } from 'models/review'
import { UpdateReviewMutationArgs, UpdateReviewResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'
import { cleanDeep } from 'utils/funcs/cleanDeep'

const resolvers: Resolvers = {
  Mutation: {
    async UpdateReview(
      _: Root,
      args: UpdateReviewMutationArgs,
      ctx: Context
    ): Promise<UpdateReviewResponse> {
      const user = ctx.user
      const reviewId = args.reviewId

      const updates = { ...cleanDeep(args.update), approved: false }

      // validate the inputs TODO:

      const review = await Review.findOneAndUpdate(
        { _id: reviewId, user },
        updates,
        { new: true }
      )

      if (review) {
        return {
          message: 'Review updated successfully',
          review
        }
      }

      return {
        message: 'Unable to update the review',
        review
      }
    }
  }
}

export default resolvers
