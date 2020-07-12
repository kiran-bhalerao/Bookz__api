import { ApolloError } from 'apollo-server-express'
import { UserModel } from 'models/user'
import { UpdateProfileMutationArgs, User as TUser } from 'types/graph'
import { Resolvers } from 'types/resolvers'
import { cleanDeep } from 'utils/funcs/cleanDeep'
import { Password } from 'utils/Password'

const resolvers: Resolvers = {
  Mutation: {
    async UpdateProfile(
      _: Root,
      args: UpdateProfileMutationArgs,
      ctx: Context
    ): Promise<TUser> {
      const user = ctx.user

      const {
        name = user.name,
        about = user.about,
        photo = user.photo,
        password
      } = cleanDeep(args)

      const update: any = { name, about, photo }

      if (password) {
        // hash the password
        const hashPassword = Password.toHash(password)
        update['password'] = hashPassword
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        update,
        { new: true }
      )

      if (!updatedUser) {
        throw new ApolloError(
          'Unable to update your profile, Internal server error.'
        )
      }

      return updatedUser
    }
  }
}

export default resolvers
