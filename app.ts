import express from "express";
import cors from 'cors';
import journeyRouter from "./src/routers/journeyRouter";
import stationRouter from "./src/routers/stationRouter";

const app = express();

app.use(cors());
app.use(express.static('build'))
app.use(express.json());
app.use("/", stationRouter);
app.use("/", journeyRouter);

export default app;
