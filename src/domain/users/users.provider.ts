import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { QueryString } from '../../shared/types'
import paginatedList from '../../utils/paginatedList'
import { PaginatedList } from '../../utils/paginatedList/types'
import queryPaginationStandardizer from '../../utils/queryPaginationStandardizer'
import { CreateUserDTO } from './dto/CreateUserDTO'
import { EditUserDTO } from './dto/EditUserDTO'
import { User } from './entities/user.entity'

@Injectable()
export class UsersProvider {
  async index (query: QueryString<User>): Promise<PaginatedList<User>> {
    const findObject = queryPaginationStandardizer(query)
    const [users, count] = await User.findAndCount(findObject)
    return paginatedList(users, count, findObject)
  }

  async show (userId: number): Promise<User> {
    try {
      const user = await User.findOneOrFail(userId)
      return user
    } catch (e) {
      throw new NotFoundException('User not found.')
    }
  }

  async store (createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const user = await User.create(createUserDTO).save()
      return user
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async edit (userId: number, editUserDTO: EditUserDTO): Promise<User> {
    const user = await User.findOne(userId)
    if (!user) throw new NotFoundException('User not found.')
    try {
      user.setAttributes(editUserDTO)
      await user.save()
      return user
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async delete (userId:number): Promise<void> {
    const user = await User.findOne(userId)
    if (!user) throw new NotFoundException('User not found.')
    try {
      await user.remove()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }
}
