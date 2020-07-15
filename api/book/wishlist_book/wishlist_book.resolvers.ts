import { ApolloError } from 'apollo-server-express'
import { BookModel } from 'models/book'
import { UserModel } from 'models/user'
import { WishlistBookMutationArgs, WishlistBookResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async WishlistBook(
      _: Root,
      args: WishlistBookMutationArgs,
      ctx: Context
    ): Promise<WishlistBookResponse> {
      const { user } = ctx
      const { bookId } = args

      const book = await BookModel.findOne({ _id: bookId })

      if (!book) {
        throw new ApolloError('Book is no there..')
      }

      const updated = await UserModel.findOneAndUpdate(
        { email: user.email },
        { $addToSet: { wishlist: book } },
        { new: true }
      )

      if (updated) {
        return {
          message: `${book?.title} is added to your wishlist.`,
          success: true
        }
      }

      return {
        message: 'Unable to add the book to your wishlist.',
        success: false
      }
    }
  }
}

export default resolvers
