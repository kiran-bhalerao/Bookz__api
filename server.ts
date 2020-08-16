import { ApolloServer } from 'apollo-server-express'
import { app } from 'app'
import { connectDatabase } from 'config/database'
import { redis } from 'config/redis'
import { AuthenticationDirective } from 'directives/authentication'
import { FormatDateDirective } from 'directives/formatdate'
import { RateLimitDirective } from 'directives/ratelimit'
import schema from 'schema'
import { AuthToken } from 'utils/AuthToken'

const PORT = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT = '/playground'

const server = new ApolloServer({
  schema,
  schemaDirectives: {
    authenticated: AuthenticationDirective,
    date: FormatDateDirective,
    rateLimit: RateLimitDirective
    /* make sure u added this 👆 in makeExecutableSchema also.. */
  },
  async context({ req }) {
    const token = req.headers.authorization
    const user = await AuthToken.getUserFromToken(token)

    return { user, redis, req }
  }
})

server.applyMiddleware({ app, path: PLAYGROUND_ENDPOINT })

const Start = async () => {
  await connectDatabase()
  await new Promise((res) => app.listen({ port: PORT }, res))

  console.log(`\n🚀 Ready at http://localhost:${PORT}${server.graphqlPath}`)
}

Start()
