
const envs = {
  development: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: ['src/domain/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
  },
  production: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['build/domain/**/*.entity.js'],
    migrations: ['build/migrations/*.js'],
  },
  test: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ['src/domain/**/*.entity.ts'],
  },
}

export default envs[process.env.NODE_ENV]
