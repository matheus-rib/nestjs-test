import { INestApplication } from '@nestjs/common'
import * as faker from 'faker'
import * as request from 'supertest'
import { createConnection } from 'typeorm'
import ormConfig from '../../../../../src/config/typeorm'
import { User } from '../../../../../src/domain/users/entities/user.entity'
import { UsersController } from '../../../../../src/domain/users/users.controller'
import { UsersProvider } from '../../../../../src/domain/users/users.provider'
import ApiFactory from '../../../../factories/ApiFactory'
import UsersFactory from '../../../../factories/UserFactory'

let app: INestApplication
let connection = null

let user: User = null
beforeAll(async () => {
  connection = await createConnection(ormConfig)
  const controllers = [UsersController]
  const providers = [UsersProvider]
  app = await ApiFactory.create({ controllers, providers })
  await app.init()

  user = await UsersFactory.create()
})

afterAll(async () => {
  await connection.close()
})

it('Should update and return User', async () => {
  const params = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }
  const { body, status } = await request(app.getHttpServer()).put(`/users/${user.id}`).send(params)

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.objectContaining({ name: params.name, email: params.email }),
  )

  const storedUser = await User.findOne(user.id)
  expect(body).toEqual(
    expect.objectContaining({ name: storedUser.name, email: storedUser.email }),
  )
})

it('Should return a not found user error', async () => {
  const params = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }
  const { body, status } = await request(app.getHttpServer()).put(`/users/${user.id}123`).send(params)

  expect(status).toBe(404)

  expect(body).toHaveProperty('statusCode')
  expect(body.statusCode).toEqual(status)
  expect(body).toHaveProperty('message')
  expect(body.message).toEqual('User not found.')
  expect(body).toHaveProperty('error')
  expect(body.error).toEqual('Not Found')
})
