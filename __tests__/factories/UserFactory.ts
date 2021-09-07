import * as faker from 'faker'
import { User } from '../../src/domain/users/entities/user.entity'

type UsersParams = {
    name?: string,
    email?: string,
}

async function create (params?: UsersParams): Promise<User> {
  const user = User.create({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    ...params,
  })

  return user.save()
}

export default { create }
