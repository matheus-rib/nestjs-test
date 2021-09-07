import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

class ORMResponse {
  @ApiProperty({})
  entity: string

  @ApiProperty({})
  property: string

  @ApiProperty({})
  constraints: Array<string>
}

export class BadRequestCreateUserDTO {
  @ApiProperty({
    description: "ORM's response",
    example: [{
      entity: 'User',
      property: 'email',
      constraints: [
        'isEmail',
      ],
    }],
  })
  response: Array<ORMResponse>

  @ApiProperty({ description: 'HTTP status response', example: 400 })
  status: HttpStatus

  @ApiProperty({ description: 'HTTP message', example: 'Http Exception' })
  message: string

  @ApiProperty({ description: 'HTTP error name', example: 'HttpException' })
  name: string
}
