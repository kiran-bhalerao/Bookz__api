import { UserDoc } from 'models/user'

declare global {
  /** Apollo context object */
  type Context = {
    user: UserDoc
  }

  /** Apollo root object */
  type Root = any

  /** Apollo any agrs object */
  type AnyArgs = any
}
