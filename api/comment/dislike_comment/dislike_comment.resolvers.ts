import { CommentModel } from 'models/comment'
import { DislikeCommentMutationArgs, DislikeCommentResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async DislikeComment(
      _: Root,
      args: DislikeCommentMutationArgs,
      ctx: Context
    ): Promise<DislikeCommentResponse> {
      const { user } = ctx
      const { commentId } = args

      const comment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $addToSet: { dislikes: user } },
        { new: true }
      )

      if (comment) {
        return {
          message: 'You just dislike this comment.',
          comment
        }
      }

      return {
        message: 'Unable to dislike the comment.',
        comment
      }
    }
  }
}

export default resolvers
