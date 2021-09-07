import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class UserNotFoundDTO {
  @ApiProperty({ description: 'HTTP status response', example: 404 })
  statusCode: HttpStatus

  @ApiProperty({ description: 'HTTP message', example: 'User not found.' })
  message: string

  @ApiProperty({ description: 'HTTP error name', example: 'Not Found' })
  error: string
}
