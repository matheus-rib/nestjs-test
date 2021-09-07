import { ApiProperty } from '@nestjs/swagger'

export class PaginatedListDTO {
  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number

  @ApiProperty({ description: 'Total pages number', example: 1 })
  pages: number

  @ApiProperty({ description: 'Total results', example: 1 })
  count: number
}
