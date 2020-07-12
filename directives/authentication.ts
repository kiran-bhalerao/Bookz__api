import {
  AuthenticationError,
  SchemaDirectiveVisitor
} from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new AuthenticationError('Not authorized')
      }
      return resolve(root, args, ctx, info)
    }
  }
}
