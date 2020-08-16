import { SchemaDirectiveVisitor } from 'apollo-server-express'
import dayjs from 'dayjs'
import { defaultFieldResolver, GraphQLField, GraphQLString } from 'graphql'

export class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any, any>) {
    const { resolve = defaultFieldResolver } = field

    const { format: defaultFormat } = this.args

    field.args.push({
      name: 'format',
      type: GraphQLString
    } as any)

    field.resolve = async (root, { format, ...args }, ctx, info) => {
      const date = await resolve.call(this, root, args, ctx, info)

      return dayjs(date).format(format || defaultFormat)
    }
    field.type = GraphQLString
  }
}
