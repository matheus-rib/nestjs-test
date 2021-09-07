import { Injectable } from '@nestjs/common'
import { QueryString } from '../../shared/types'
import paginatedList from '../../utils/paginatedList'
import { PaginatedList } from '../../utils/paginatedList/types'
import queryPaginationStandardizer from '../../utils/queryPaginationStandardizer'
import { User } from './entities/user.entity'

@Injectable()
export class UsersProvider {
  async index (query: QueryString<User>): Promise<PaginatedList<User>> {
    const findObject = queryPaginationStandardizer(query)
    const [users, count] = await User.findAndCount(findObject)
    return paginatedList(users, count, findObject)
  }
}
