import { name, version, description } from '../../../package.json'
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export default function swaggerSetup (app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build()

  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'NestJS App - Docs',
  }

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/docs', app, swaggerDocument, swaggerCustomOptions)
}
