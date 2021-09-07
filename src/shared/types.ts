import { FindConditions, ObjectLiteral } from 'typeorm'

type Where<T> = string | ObjectLiteral | FindConditions<T> | FindConditions<Array<T>>

export type QueryString<T> = {
  page?: number
  perPage?: number
  where?: Where<T>,
}

export type FindObject<T> = {
  where?: Where<T>,
  skip: number,
  take: number,
}
