import { INestApplication } from '@nestjs/common'
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

let user1: User = null
let user2: User = null
let user3: User = null

beforeAll(async () => {
  connection = await createConnection(ormConfig)

  user1 = await UsersFactory.create()
  user2 = await UsersFactory.create()
  user3 = await UsersFactory.create()

  const controllers = [UsersController]
  const providers = [UsersProvider]
  app = await ApiFactory.create({ controllers, providers })
  await app.init()
})

afterAll(async () => {
  await connection.close()
})

it('Should return a paginated list of Users', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users')

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(3)

  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user1.id, name: user1.name, email: user1.email }),
      expect.objectContaining({ id: user2.id, name: user2.name, email: user2.email }),
      expect.objectContaining({ id: user3.id, name: user3.name, email: user3.email }),
    ]),
  )
})

it('Should return a paginated list of Users filtered by user id', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users').query({ where: { id: user1.id } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(1)

  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user1.id, name: user1.name, email: user1.email }),
    ]),
  )
})

it('Should return a paginated list of Users filtered by user name', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users').query({ where: { name: user2.name } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(1)

  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user2.id, name: user2.name, email: user2.email }),
    ]),
  )
})

it('Should return a paginated list of Users filtered by user email', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users').query({ where: { email: user3.email } })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(1)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(1)

  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user3.id, name: user3.name, email: user3.email }),
    ]),
  )
})

it('Should return a limited by 1 register per page paginated list of Users', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users').query({ perPage: 1 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(1)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(3)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(1)

  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user1.id, name: user1.name, email: user1.email }),
    ]),
  )
})

it('Should return a limited by 1 register per page on second page paginated list of Users', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users').query({ perPage: 1, page: 2 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(2)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(3)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(1)

  expect(body.rows).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: user2.id, name: user2.name, email: user2.email }),
    ]),
  )
})

it('Should return a empty list of Users if fetching a non existent page', async () => {
  const { body, status } = await request(app.getHttpServer()).get('/users').query({ page: 100 })

  expect(status).toBe(200)

  expect(body).toHaveProperty('page')
  expect(body.page).toBe(100)

  expect(body).toHaveProperty('pages')
  expect(body.pages).toBe(1)

  expect(body).toHaveProperty('count')
  expect(body.count).toBe(3)

  expect(body).toHaveProperty('rows')
  expect(body.rows.length).toBe(0)

  expect(body.rows).toEqual(
    expect.arrayContaining([]),
  )
})
