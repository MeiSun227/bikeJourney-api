import express from "express";
import {
  addedJourney,
  deletedJourney,
  getJourney,
  getJourneys,
} from "../controllers/journeyController";

const journeyRouter = express.Router();

journeyRouter.get("/api/journey", getJourneys);
journeyRouter.get("/api/journey/:id", getJourney);
journeyRouter.post("/api/journey", addedJourney);
journeyRouter.delete("/api/journey/:id", deletedJourney);

export default journeyRouter;
