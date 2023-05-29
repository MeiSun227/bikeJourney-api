import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Journey } from "./Journey";
import { Station } from "./Station";
import "reflect-metadata";

dotenv.config({ path: ".env" });

const POSTGRES_PORT =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_TEST_PORT
    : process.env.POSTGRES_DEV_PORT;
process.env.NODE_ENV === "deploy"
  ? process.env.POSTGRES_FLY_PORT
  : process.env.POSTGRES_DEV_PORT;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME || process.env.POSTGRES_FLY_USERNAME,
  password: process.env.POSTGRES_PASSWORD|| process.env.POSTGRES_FLY_PASSWORD,
  database: process.env.POSTGRES_DATABASE|| process.env.POSTGRES_DATABASE_HOST,
  synchronize: true,
  logging: true,
  entities: [Journey, Station],
  poolSize: 50,
});
