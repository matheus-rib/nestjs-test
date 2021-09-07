import { FindObject, QueryString } from '../../shared/types'

export default function<T> (query: QueryString<T>): FindObject<T> {
  const { perPage, page, where } = query

  const take = Math.min(500, perPage || 30)
  const actualPage = page || 1
  const skip = (actualPage - 1) * take

  return {
    where,
    skip,
    take,
  }
}
