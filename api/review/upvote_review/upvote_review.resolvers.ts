import { Review } from 'models/review'
import { UpvoteReviewMutationArgs, UpvoteReviewResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async UpvoteReview(
      _: Root,
      args: UpvoteReviewMutationArgs,
      ctx: Context
    ): Promise<UpvoteReviewResponse> {
      const { reviewId } = args
      const user = ctx.user

      const alreadyUpvoted = await Review.findOne({
        _id: reviewId,
        upvotes: { $in: [user] }
      })

      if (alreadyUpvoted) {
        await Review.findOneAndUpdate(
          { _id: reviewId },
          { $pull: { upvotes: user.id } },
          { new: true }
        )

        return {
          message: 'Removed upvote from this review',
          isUpvoted: false
        }
      }

      await Review.findOneAndUpdate(
        { _id: reviewId },
        { $push: { upvotes: user } },
        { new: true }
      )

      return {
        message: 'Thanks for upvoting this review 😍',
        isUpvoted: true
      }
    }
  }
}

export default resolvers
