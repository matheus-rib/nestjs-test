import { createConnection } from 'typeorm'
import ormConfig from './config/typeorm'

async function bootstrap (): Promise<void> {
  try {
    await createConnection(ormConfig)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

bootstrap()
