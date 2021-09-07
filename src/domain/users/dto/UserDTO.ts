import { ApiProperty } from '@nestjs/swagger'

export class UserDTO {
  @ApiProperty({ description: "User's ID", example: 1 })
  id: number

  @ApiProperty({ description: "User's creation datetime", example: '2021-09-07T01:53:00.215Z' })
  createdAt: string

  @ApiProperty({ description: "User's last update datetime", example: '2021-09-07T01:53:00.215Z' })
  updatedAt: string

  @ApiProperty({ description: "User's name", example: 'Matt' })
  name:string

  @ApiProperty({ description: "User's email", example: 'matt.ribeiro14@outlook.com' })
  email:string
}
