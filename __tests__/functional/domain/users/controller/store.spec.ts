import { INestApplication } from '@nestjs/common'
import * as faker from 'faker'
import * as request from 'supertest'
import { createConnection } from 'typeorm'
import ormConfig from '../../../../../src/config/typeorm'
import { User } from '../../../../../src/domain/users/entities/user.entity'
import { UsersController } from '../../../../../src/domain/users/users.controller'
import { UsersProvider } from '../../../../../src/domain/users/users.provider'
import ApiFactory from '../../../../factories/ApiFactory'

let app: INestApplication
let connection = null

beforeAll(async () => {
  connection = await createConnection(ormConfig)
  const controllers = [UsersController]
  const providers = [UsersProvider]
  app = await ApiFactory.create({ controllers, providers })
  await app.init()
})

afterAll(async () => {
  await connection.close()
})

it('Should create and return an User', async () => {
  const params = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }
  const { body, status } = await request(app.getHttpServer()).post('/users').send(params)

  expect(status).toBe(201)
  expect(body).toEqual(
    expect.objectContaining({ name: params.name, email: params.email }),
  )

  const storedUser = await User.findOne(body.id)
  expect(body).toEqual(
    expect.objectContaining({ name: storedUser.name, email: storedUser.email }),
  )
})

it('Should return a bad request error if not sending a valid email', async () => {
  const params = {
    name: faker.name.firstName(),
    email: faker.name.firstName(),
  }
  const { body, status } = await request(app.getHttpServer()).post('/users').send(params)

  expect(status).toBe(400)

  expect(body).toHaveProperty('response')
  expect(body.response).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ entity: 'User', property: 'email', constraints: expect.arrayContaining(['isEmail']) }),
    ]),
  )
})
