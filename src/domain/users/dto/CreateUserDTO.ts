import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    example: 'Matt',
    description: "User's name",
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    type: String,
    example: 'matt.ribeiro14@outlook.com',
    description: "User's email",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string
}
