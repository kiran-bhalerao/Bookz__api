import { UserInputError } from 'apollo-server-express'
import { UserModel } from 'models/user'
import { LoginMutationArgs, LoginResponse } from 'types/graph'
import { Resolvers } from 'types/resolvers'
import { AuthToken } from 'utils/AuthToken'
import { Password } from 'utils/Password'
import { Validator } from 'utils/Validator'
import { LoginSchema } from 'validators/user.schema'

const resolvers: Resolvers = {
  Mutation: {
    async Login(_: any, args: LoginMutationArgs): Promise<LoginResponse> {
      const { email, password } = args

      // validate inputs
      const { error } = await Validator.validate(LoginSchema, {
        email,
        password
      })

      // throw error on invalid inputs
      if (error) {
        throw error
      }

      const user = await UserModel.findOne({ email })
      if (!user) {
        throw new UserInputError(
          'User does not exists with the email you provided.'
        )
      }

      // compare password
      if (!Password.compare(user.password, password)) {
        throw new UserInputError('Password does not match.')
      }

      const token = AuthToken.sign({
        id: user.id,
        email: user.email,
        role: user.role
      })

      return {
        message: 'Login successful',
        token: token
      }
    }
  }
}

export default resolvers
