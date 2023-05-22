import { Request, Response, NextFunction } from 'express';
import { getAllStations, getStationData,mostPopularDepartureStation, mostPopularReturnStation,updateStation,addStation  } from '../services/stationService';
import { BadRequestError } from '../utils/apiError';

export const getStations = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const allStations = await getAllStations();
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
        const popularDepartureStations= await mostPopularDepartureStation()
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
        const popularReturnStations= await mostPopularReturnStation()
        res.json(popularReturnStations);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}

export const updatedStation = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const stationEntry= req.body;
        const stationId = Number(req.params.id)
        const stationUpdate = await updateStation(stationId, stationEntry)
        res.json(stationUpdate);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}

export const addedStation = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const stationEntry= req.body;
        const addedStation = await addStation(stationEntry)
        res.json(addedStation);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
}
