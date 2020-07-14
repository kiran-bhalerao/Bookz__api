import { CommentModel } from 'models/comment'
import { DeleteCommentMutationArgs, DeleteCommentResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async DeleteComment(
      _: Root,
      args: DeleteCommentMutationArgs,
      ctx: Context
    ): Promise<DeleteCommentResponse> {
      const { user } = ctx
      const { commentId } = args

      const { deletedCount } = await CommentModel.deleteOne({
        _id: commentId,
        user
      })

      if (typeof deletedCount === 'number' && deletedCount < 1) {
        return {
          message: 'Your comment is deleted successfully',
          success: true
        }
      }

      return {
        message: 'Unable to delete your comment',
        success: false
      }
    }
  }
}

export default resolvers
