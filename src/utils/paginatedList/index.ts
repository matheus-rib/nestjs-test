import { FindObject } from '../../shared/types'
import { PaginatedList } from './types'

export default function<T> (rows: Array<T>, count: number, query: FindObject<T>): PaginatedList<T> {
  return {
    page: query.skip / query.take + 1,
    pages: Math.ceil(count / query.take),
    count,
    rows,
  }
}
