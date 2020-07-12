import { BookModel } from 'models/book'
import { Book, GetBookQueryArgs } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Query: {
    async GetBook(_: Root, args: GetBookQueryArgs): Promise<Book | null> {
      const book = await BookModel.findOne({ _id: args.bookId }).populate(
        'user'
      )

      return book
    }
  }
}

export default resolvers
