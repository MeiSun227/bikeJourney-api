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

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Journey, Station],
  poolSize: 50,
});
