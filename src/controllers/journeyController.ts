import { Request, Response, NextFunction } from 'express';
import journeyService, { SortType } from '../services/journeyService';
import { BadRequestError } from '../utils/apiError';

export const getJourneys = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const sort: SortType = { field: req.query.sortField as string, direction: req.query.sortDirection as string }
        const allJourneys = await journeyService.getAllJourneys(Number(req.query.pagesize), Number(req.query.pagenumber), req.query.search as string, sort);
        res.json(allJourneys);

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
};

export const getJourney = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const journey = await journeyService.getJourney(Number(req.params.id));
        res.json(journey);
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error));
        }
        next(error);
    }
};



