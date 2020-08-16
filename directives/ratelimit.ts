import { ApolloError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import ordinal from 'ordinal'

const ONE_DAY = 60 * 60 * 24

export class RateLimitDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any, any>) {
    const { resolve = defaultFieldResolver } = field
    const { frame = ONE_DAY, limit = 10, inputs = [] } = this.args

    field.resolve = async (root: Root, args: AnyArgs, ctx: Context, info) => {
      const inputs_key = inputs
        .map((arg: string) => args[arg])
        .filter(Boolean)
        .join('__')

      const key = `rate-limit::${info.fieldName}__${ctx.req.ip}__${inputs_key}`
      const currentRequestNumber = await ctx.redis.incr(key)

      if (currentRequestNumber > limit) {
        throw new ApolloError(
          `Woah there, you are doing way too much.. This is your ${ordinal(
            currentRequestNumber
          )} request`
        )
      } else if (currentRequestNumber === 1) {
        await ctx.redis.expire(key, frame)
      }

      return resolve(root, args, ctx, info)
    }
  }
}
