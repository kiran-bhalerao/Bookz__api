import omit from 'lodash/omit'
import { UserModel } from 'models/user'
import { GetUserQueryArgs, GetUserResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'

const resolvers: Resolvers = {
  Query: {
    async GetUser(_: Root, args: GetUserQueryArgs): Promise<GetUserResponse> {
      const { userId } = args
      const user = await UserModel.findById(userId)

      return omit(user, ['email', 'wishlist'])
    }
  }
}

export default resolvers
