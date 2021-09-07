import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { createConnection } from 'typeorm'
import { User } from '../../../../../src/domain/users/entities/user.entity'
import { UsersController } from '../../../../../src/domain/users/users.controller'
import { UsersProvider } from '../../../../../src/domain/users/users.provider'
import ApiFactory from '../../../../factories/ApiFactory'
import UsersFactory from '../../../../factories/UserFactory'
import ormConfig from '../../../../../src/config/typeorm'

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

it('Should return a user', async () => {
  const { body, status } = await request(app.getHttpServer()).get(`/users/${user.id}`)

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.objectContaining({ id: user.id, name: user.name, email: user.email }),
  )
})

it('Should return a not found user error', async () => {
  const { body, status } = await request(app.getHttpServer()).get(`/users/${user.id}123`)

  expect(status).toBe(404)

  expect(body).toHaveProperty('statusCode')
  expect(body.statusCode).toEqual(status)
  expect(body).toHaveProperty('message')
  expect(body.message).toEqual('User not found.')
  expect(body).toHaveProperty('error')
  expect(body.error).toEqual('Not Found')
})
