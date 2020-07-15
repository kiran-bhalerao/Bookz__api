import { UserModel } from 'models/user'
import { UnWishlistBookMutationArgs, UnWishlistBookResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async UnWishlistBook(
      _: Root,
      args: UnWishlistBookMutationArgs,
      ctx: Context
    ): Promise<UnWishlistBookResponse> {
      const { user } = ctx
      const { bookId } = args

      await UserModel.findOneAndUpdate(
        { email: user.email },
        { $pull: { wishlist: bookId } },
        { new: true }
      )

      return {
        message: 'The book is removed from your wishlist.',
        success: true
      }
    }
  }
}

export default resolvers
