import { Request } from 'express'
import Redis from 'ioredis'
import { UserDoc } from 'models/user'

declare global {
  /** Apollo context object */
  interface Context {
    user: UserDoc
    redis: Redis.Redis
    req: Request
  }

  /** Apollo root object */
  type Root = any

  /** Apollo any agrs object */
  type AnyArgs = any

  type AnyMap = Record<string, any>
}
