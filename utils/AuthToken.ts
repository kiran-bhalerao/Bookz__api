import jwt from 'jsonwebtoken'
import { UserModel } from 'models/user'

export class AuthToken {
  static sign(payload: Record<string, any>) {
    const JWT_KEY = process.env.JWT_KEY!

    return jwt.sign(payload, JWT_KEY)
  }

  static verify(token: string): Promise<Record<string, any>> {
    const JWT_KEY = process.env.JWT_KEY!

    return new Promise((res, rej) => {
      jwt.verify(token, JWT_KEY, (err, decoded?: Record<string, any>) => {
        if (err) {
          return rej(err)
        }
        res(decoded)
      })
    })
  }

  static async getUserFromToken(token = '') {
    try {
      const user = await AuthToken.verify(token)
      return UserModel.findOne({ email: user.email })
    } catch (e) {
      return null
    }
  }
}
