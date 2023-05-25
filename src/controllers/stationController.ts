import { Request, Response, NextFunction } from 'express';
import { getAllStations, getStationData, mostPopularDepartureStation, mostPopularReturnStation, updateStation, addStation, deleteStation } from '../services/stationService';
import { BadRequestError } from '../utils/apiError';

export const getStations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.query.search)
        const allStations = await getAllStations(req.query.search as string);
        res.json(allStations);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
};

export const getStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const stationData = await getStationData(Number(req.params.id));
        res.json(stationData);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}

export const getPopularDepartureStationCount = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const popularDepartureStations = await mostPopularDepartureStation()
        res.json(popularDepartureStations);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }

}

export const getPopularReturnStationCount = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const popularReturnStations = await mostPopularReturnStation()
        res.json(popularReturnStations);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}

export const updatedStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const stationEntry = req.body;
        const stationUpdate = await updateStation(stationEntry)
        res.json(stationUpdate);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}

export const addedStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const stationEntry = req.body;
        const stations = await getAllStations(req.query.search as string)
        const generateFId = Number(stations.length +1);
        const id = Number(Math.floor(Math.random() * 100))

        const station  = {
            ...stationEntry,
            FID: generateFId,
            id: id,
            address: stationEntry.address,
            capacities: Number(stationEntry.capacities),
            city: stationEntry.city,
            operator:stationEntry.operator,
            x: Number(stationEntry.x),
            y:Number(stationEntry.y)
        } 
        console.log(stationEntry)

        const addedStation = await addStation(station)
        res.json(addedStation);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}

export const deletedStation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await deleteStation(Number(req.params.id));
      res.sendStatus(204).end();
    } catch (error) {
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error));
      }
      next(error);
    }
  };
