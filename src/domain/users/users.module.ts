import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersProvider } from './users.provider'

@Module({
  controllers: [UsersController],
  providers: [UsersProvider],
})
export class UsersModule {}
