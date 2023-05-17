import express from 'express';
import { getPopularDepartureStationCount, getPopularReturnStationCount, getStation, getStations } from '../controllers/stationController';


const stationRouter = express.Router();

stationRouter.get('/api/station', getStations);
stationRouter.get('/api/station/:id', getStation);
stationRouter.get('/api/departure-station',getPopularDepartureStationCount);
stationRouter.get('/api/return-station',getPopularReturnStationCount);




export default stationRouter