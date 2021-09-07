import { Controller, Get, Param, Query } from '@nestjs/common'
import { QueryString } from '../../shared/types'
import { PaginatedList } from '../../utils/paginatedList/types'
import { User } from './entities/user.entity'
import { UsersProvider } from './users.provider'

@Controller('users')
export class UsersController {
  constructor (private usersProvider: UsersProvider) {
    this.usersProvider = usersProvider
  }

  @Get()
  async index (@Query() query: QueryString<User>): Promise<PaginatedList<User>> {
    return this.usersProvider.index(query)
  }

  @Get(':userId')
  async show (@Param('userId') userId: number): Promise<User> {
    return this.usersProvider.show(userId)
  }
}
