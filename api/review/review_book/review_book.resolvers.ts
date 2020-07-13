import { ApolloError } from 'apollo-server-express'
import { BookModel } from 'models/book'
import { Review } from 'models/review'
import { ReviewBookMutationArgs, ReviewBookResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async ReviewBook(
      _: Root,
      args: ReviewBookMutationArgs,
      ctx: Context
    ): Promise<ReviewBookResponse> {
      const user = ctx.user

      const { bookId, title, description, rating } = args

      // input validation TODO:

      // find the book & check for the book is verified TODO:
      const book = await BookModel.findById(bookId)
      if (!book) {
        throw new ApolloError('Book not found that you are try to review')
      }

      const review = await Review.build({
        title,
        description,
        rating,
        user,
        book,
        comments: [],
        upvotes: []
      }).save()

      return {
        message: `Thanks for reviewing the book: '${book.title}', Your review will get published once it get approved.`,
        review
      }
    }
  }
}

export default resolvers
