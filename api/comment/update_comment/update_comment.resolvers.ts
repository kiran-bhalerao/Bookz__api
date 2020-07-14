import { CommentModel } from 'models/comment'
import { Comment, UpdateCommentMutationArgs } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async UpdateComment(
      _: Root,
      args: UpdateCommentMutationArgs,
      ctx: Context
    ): Promise<Comment | null> {
      const user = ctx.user
      const { commentId, updates } = args

      const comment = await CommentModel.findOneAndUpdate(
        { _id: commentId, user },
        { ...updates },
        { new: true }
      ).populate('user')

      return comment
    }
  }
}

export default resolvers
