import clean, { CleanOptions } from 'clean-deep'

export type NullTOOptional<O> = {
  [K in keyof O]-?: null extends O[K] ? NonNullable<O[K]> | undefined : O[K]
}

export const cleanDeep = <T>(object: T, options?: CleanOptions) => {
  return clean(object, options) as NullTOOptional<T>
}
