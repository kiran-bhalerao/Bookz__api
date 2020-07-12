import { UserInputError } from 'apollo-server-express'
import { UserModel } from 'models/user'
import { SignupMutationArgs, SignupResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'
import { AuthToken } from 'utils/AuthToken'
import { Validator } from 'utils/Validator'
import { SignupSchema } from 'validators/user.schema'

const resolvers: Resolvers = {
  Mutation: {
    async Signup(_: any, args: SignupMutationArgs): Promise<SignupResponse> {
      const { email, name, password } = args

      // validate inputs
      const { error } = await Validator.validate(SignupSchema, {
        name,
        email,
        password
      })

      // throw error on invalid inputs
      if (error) {
        throw error
      }

      // check user already exists with same email
      const existingUser = await UserModel.findOne({ email })

      if (existingUser) {
        throw new UserInputError('User already exists with same email')
      }

      const user = await UserModel.build({
        email,
        password,
        name,
        about: null,
        photo: null,
        wishlist: []
      }).save()

      const authToken = AuthToken.sign({
        id: user.id,
        email: user.email,
        role: user.role
      })

      return {
        token: authToken,
        message:
          'Signup successful, Please complete your profile to get started.'
      }
    }
  }
}

export default resolvers
