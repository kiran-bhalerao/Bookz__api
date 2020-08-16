import { ShareBookMutationArgs, ShareBookResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async ShareBook(
      _: Root,
      { bookId }: ShareBookMutationArgs,
      ctx: Context
    ): Promise<ShareBookResponse> {
      const user = ctx.user!

      return {
        success: true,
        message: 'done'
      }
    }
  }
}

export default resolvers
