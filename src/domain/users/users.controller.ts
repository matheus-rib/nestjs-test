import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { QueryString } from '../../shared/types'
import { PaginatedList } from '../../utils/paginatedList/types'
import { BadRequestCreateUserDTO } from './dto/BadRequestCreateUserDTO'
import { CreateUserDTO } from './dto/CreateUserDTO'
import { IndexUsersResponseDTO } from './dto/IndexUsersResponseDTO'
import { ShowUserResponseDTO } from './dto/ShowUserResponseDTO'
import { UserNotFoundDTO } from './dto/UserNotFoundDTO'
import { User } from './entities/user.entity'
import { UsersProvider } from './users.provider'
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (private usersProvider: UsersProvider) {
    this.usersProvider = usersProvider
  }

  @ApiOkResponse({ description: 'The found records.', type: IndexUsersResponseDTO })
  @ApiOperation({ description: 'Retrieve many Users.' })
  @Get()
  async index (@Query() query: QueryString<User>): Promise<PaginatedList<User>> {
    return this.usersProvider.index(query)
  }

  @ApiOkResponse({ description: 'Retrieve the user by the Id.', type: ShowUserResponseDTO })
  @ApiNotFoundResponse({ description: 'User not found.', type: UserNotFoundDTO })
  @Get(':userId')
  async show (@Param('userId') userId: number): Promise<User> {
    return this.usersProvider.show(userId)
  }

  @Post()
  @ApiOkResponse({ description: 'Retrieve the created user', type: ShowUserResponseDTO })
  @ApiBadRequestResponse({ description: 'Occurred errors trying to create user.', type: BadRequestCreateUserDTO })
  async store (@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersProvider.store(createUserDTO)
  }
}
