import { ApiProperty } from '@nestjs/swagger'
import { PaginatedListDTO } from '../../../shared/PaginatedListDTO'
import { UserDTO } from './UserDTO'

export class IndexUsersResponseDTO extends PaginatedListDTO {
  @ApiProperty({
    description: 'records',
    example: {
      id: 1,
      createdAt: '2021-09-07T01:53:00.215Z',
      updatedAt: '2021-09-07T01:53:00.215Z',
      name: 'Matt',
      email: 'matt.ribeiro14@outlook.com',
    },
  })
  rows: Array<UserDTO>
}
