import express from "express";
import {
  addedStation,
  deletedStation,
  getPopularDepartureStationCount,
  getPopularReturnStationCount,
  getStation,
  getStations,
  updatedStation,
} from "../controllers/stationController";

const stationRouter = express.Router();

stationRouter.get("/api/station", getStations);
stationRouter.get("/api/station/:id", getStation);
stationRouter.get("/api/departure-station", getPopularDepartureStationCount);
stationRouter.get("/api/return-station", getPopularReturnStationCount);
stationRouter.put("/api/station/:id", updatedStation);
stationRouter.post("/api/station", addedStation);
stationRouter.delete("/api/station/:id", deletedStation);

export default stationRouter;
