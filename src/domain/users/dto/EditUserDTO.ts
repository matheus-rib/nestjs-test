import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class EditUserDTO {
  @ApiProperty({
    type: String,
    example: 'Matt',
    description: "User's name",
  })
  name?: string

  @ApiProperty({
    type: String,
    example: 'matt.ribeiro14@outlook.com',
    description: "User's email",
  })
  @IsEmail()
  email?: string
}
