import { Review } from 'models/review'
import { DeleteReviewMutationArgs, DeleteReviewResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async DeleteReview(
      _: Root,
      args: DeleteReviewMutationArgs,
      ctx: Context
    ): Promise<DeleteReviewResponse> {
      const { reviewId } = args
      const user = ctx.user

      const deletedReview = await Review.findOneAndDelete({
        _id: reviewId,
        user
      })

      if (deletedReview) {
        return {
          message: 'Your review deleted successfully.',
          success: true
        }
      }

      return {
        message: 'Unable to delete this review',
        success: false
      }
    }
  }
}

export default resolvers
