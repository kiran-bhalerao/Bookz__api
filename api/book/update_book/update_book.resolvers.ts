import { BookModel } from 'models/book'
import { Book, UpdateBookMutationArgs } from 'types/graph'
import { Resolvers } from 'types/resolvers'
import { cleanDeep } from 'utils/funcs/cleanDeep'

const resolvers: Resolvers = {
  Mutation: {
    async UpdateBook(
      _: Root,
      args: UpdateBookMutationArgs,
      ctx: Context
    ): Promise<Book | null> {
      const user = ctx.user

      const bookId = args.bookId
      const appendSellers = args.options?.appendSellers

      const updates: AnyMap = { ...cleanDeep(args.update), verified: false }

      const sellers = updates.sellers
      if (sellers && appendSellers) {
        delete updates.sellers
        updates['$push'] = { sellers: { $each: sellers } }
      }

      const book = await BookModel.findOneAndUpdate(
        { _id: bookId, user },
        updates,
        { new: true }
      )

      return book
    }
  }
}

export default resolvers
