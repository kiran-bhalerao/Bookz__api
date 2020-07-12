import { BookModel } from 'models/book'
import { DeleteBookMutationArgs, DeleteBookResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async DeleteBook(
      _: Root,
      args: DeleteBookMutationArgs,
      ctx: Context
    ): Promise<DeleteBookResponse> {
      const user = ctx.user
      const bookId = args.bookId

      const res = await BookModel.findOneAndDelete({ _id: bookId, user })

      if (res) {
        return {
          message: 'Book deleted successfully'
        }
      }

      return {
        message: 'Unable to delete the book'
      }
    }
  }
}

export default resolvers
