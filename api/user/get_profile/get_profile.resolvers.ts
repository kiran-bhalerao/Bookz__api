import { User } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Query: {
    async GetProfile(_: Root, __: AnyArgs, ctx: Context): Promise<User> {
      return ctx.user
    }
  }
}

export default resolvers
