import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

const port = process.env.TYPEORM_PORT as unknown as number | undefined;

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_URL ? "database" : "localhost",
  port: port,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + "/**/entities/*.entity.{ts,js}"],
  migrations: [__dirname + "/**/migrations/**/*.{ts,js}"],
  logging: true,
  migrationsRun: false,
});
