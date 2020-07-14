import { CommentModel } from 'models/comment'
import { LikeCommentMutationArgs, LikeCommentResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async LikeComment(
      _: Root,
      args: LikeCommentMutationArgs,
      ctx: Context
    ): Promise<LikeCommentResponse> {
      const { user } = ctx
      const { commentId } = args

      const comment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: user } },
        { new: true }
      )

      if (comment) {
        return {
          message: 'Thank for liking this comment.',
          comment
        }
      }

      return {
        message: 'Unable to like the comment.',
        comment
      }
    }
  }
}

export default resolvers
