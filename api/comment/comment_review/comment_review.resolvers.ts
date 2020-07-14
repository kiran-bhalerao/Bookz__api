import { ApolloError } from 'apollo-server-express'
import { CommentModel } from 'models/comment'
import { Review } from 'models/review'
import { Comment, CommentReviewMutationArgs } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async CommentReview(
      _: Root,
      args: CommentReviewMutationArgs,
      ctx: Context
    ): Promise<Comment> {
      const user = ctx.user
      const { comment, reviewId } = args
      const review = await Review.findById(reviewId)

      if (!review) {
        throw new ApolloError(
          'Review does not found that you are trying to comment'
        )
      }

      const createdComment = await CommentModel.build({
        bookId: review.book._id,
        reviewId,
        comment,
        user,
        likes: [],
        dislikes: []
      }).save()

      return createdComment
    }
  }
}

export default resolvers
