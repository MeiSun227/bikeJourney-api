import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Journey } from "./Journey";
import { Station } from "./Station";
import "reflect-metadata";

dotenv.config({ path: '.env' });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Journey, Station],
    poolSize: 50
})