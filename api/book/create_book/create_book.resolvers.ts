import { BookModel } from 'models/book'
import { CreateBookMutationArgs, CreateBookResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Mutation: {
    async CreateBook(
      _: Root,
      args: CreateBookMutationArgs,
      ctx: Context
    ): Promise<CreateBookResponse> {
      const user = ctx.user

      const book = await BookModel.build({
        ...args,
        user
      }).save()

      return {
        message: `Hi ${user.name}, ${args.title} is listed successfully. You will get notified as soon as it get verified/published ✔️`,
        book: book
      }
    }
  }
}

export default resolvers
