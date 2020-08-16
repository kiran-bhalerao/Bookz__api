import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { AuthenticationDirective } from 'directives/authentication'
import { FormatDateDirective } from 'directives/formatdate'
import { RateLimitDirective } from 'directives/ratelimit'
import { GraphQLSchema } from 'graphql'
import path from 'path'

const allTypes: GraphQLSchema[] = loadFilesSync(
  path.join(__dirname, 'api/**/*.graphql')
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allResolvers: any[] = loadFilesSync(
  path.join(__dirname, 'api/**/*.resolvers.*')
)

const mergedTypes = mergeTypeDefs(allTypes)
const mergedResolvers = mergeResolvers(allResolvers)

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
  schemaDirectives: {
    authenticated: AuthenticationDirective,
    date: FormatDateDirective,
    rateLimit: RateLimitDirective
  } as Record<string, any>
})

export default schema
