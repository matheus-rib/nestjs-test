export type PaginatedList<T> = {
  page: number
  pages: number,
  count: number,
  rows: Array<T>
}
