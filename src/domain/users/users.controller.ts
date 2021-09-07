import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { QueryString } from '../../shared/types'
import { PaginatedList } from '../../utils/paginatedList/types'
import { BadRequestCreateUserDTO } from './dto/BadRequestCreateUserDTO'
import { CreateUserDTO } from './dto/CreateUserDTO'
import { EditUserDTO } from './dto/EditUserDTO'
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
  @ApiOperation({ description: 'Retrieve a single User.' })
  @Get(':userId')
  async show (@Param('userId') userId: number): Promise<User> {
    return this.usersProvider.show(userId)
  }

  @Post()
  @ApiCreatedResponse({ description: 'Retrieve the created user', type: ShowUserResponseDTO })
  @ApiBadRequestResponse({ description: 'Occurred errors trying to create user.', type: BadRequestCreateUserDTO })
  @ApiOperation({ description: 'Create an User.' })
  async store (@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersProvider.store(createUserDTO)
  }

  @Put(':userId')
  @ApiOkResponse({ description: 'Retrieve the updated user', type: ShowUserResponseDTO })
  @ApiBadRequestResponse({ description: 'Occurred errors trying to update user.', type: BadRequestCreateUserDTO })
  @ApiNotFoundResponse({ description: 'User not found.', type: UserNotFoundDTO })
  @ApiOperation({ description: 'Update an User.' })
  async edit (@Param('userId') userId: number, @Body() editUserDTO: EditUserDTO): Promise<User> {
    return this.usersProvider.edit(userId, editUserDTO)
  }

  @Delete(':userId')
  @ApiNoContentResponse({ description: 'No body' })
  @ApiInternalServerErrorResponse({ description: 'Occurred errors trying to delete used' })
  @ApiNotFoundResponse({ description: 'User not found.', type: UserNotFoundDTO })
  @ApiOperation({ description: 'Delete an User.' })
  async delete (@Param('userId') userId: number): Promise<void> {
    return this.usersProvider.delete(userId)
  }
}
