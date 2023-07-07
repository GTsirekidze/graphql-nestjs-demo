import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () => {
  const {
    DATABASE_HOST = 'localhost',
    DATABASE_PORT = 5432,
    DATABASE_USER = 'gigitsirekidze',
    DATABASE_PASSWORD = 'gigimate123',
    DATABASE_NAME = 'work_db',
    //DATABASE_SCHEMA = ''
  } = process.env;

  return {
    type: 'postgres',
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: false,
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true,
    namingStrategy: new SnakeNamingStrategy(),
    schema: 'graphql_demo_schema',
    logging: false,
  };
};
