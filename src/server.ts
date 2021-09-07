import { NestFactory } from '@nestjs/core'
import { createConnection } from 'typeorm'
import { AppModule } from './app'
import swaggerSetup from './common/swagger'
import ormConfig from './config/typeorm'

async function bootstrap (): Promise<void> {
  try {
    await createConnection(ormConfig)

    const app = await NestFactory.create(AppModule)

    swaggerSetup(app)

    await app.listen(80, () => {
      console.info('🚀 API Running on http://localhost:80 🚀')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

bootstrap()
