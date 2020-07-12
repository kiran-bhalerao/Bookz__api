/* eslint-disable @typescript-eslint/ban-types */
import { ObjectSchema, ValidationError } from 'yup'

export class Validator {
  static isValid<T extends object | undefined>(
    schema: ObjectSchema<T>,
    values: any
  ) {
    return schema.isValidSync(values)
  }

  static async validate<T extends object | undefined>(
    schema: ObjectSchema<T>,
    values: T
  ): Promise<{ values: T; error?: ValidationError }> {
    let error: ValidationError | undefined = undefined

    try {
      await schema.validate(values, { abortEarly: false })
    } catch (err) {
      error = err
    }

    return {
      values,
      error
    }
  }
}
