import express from 'express';
import {getJourney, getJourneys} from '../controllers/journeyController';


const journeyRouter = express.Router();

journeyRouter.get('/api/journey', getJourneys);
journeyRouter.get('/api/journey/:id', getJourney)




export default journeyRouter