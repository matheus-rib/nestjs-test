/* eslint-disable @typescript-eslint/no-explicit-any */
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

type ApiParams = {
    providers: Array<any>,
    controllers: Array<any>,
}

async function create (params: ApiParams): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    providers: params.providers,
    controllers: params.controllers,
  }).compile()

  return module.createNestApplication()
}

export default { create }
