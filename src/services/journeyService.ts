import { ILike } from "typeorm/find-options/operator/ILike";
import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";

const journeyData = AppDataSource.getRepository(Journey)

export type SortType = {
    field: string;
    direction: string;
}

export type IJouney = {
    journeyList: Journey[]
    total: number
}

const getAllJourneys = async (pageSize: number, pageNumber: number, search: string | undefined, sort: SortType): Promise<IJouney | Journey[]> => {
    const offset = pageSize * pageNumber
    const limit = pageSize
    console.log(sort)
    const sortField = sort.field ? sort.field : 'departurestation_name'
    console.log(sortField)
    if (search && search !== 'undefined') {
        console.log('at search')
        const [filteredJourneys, count] = await journeyData
            .findAndCount({
                where: [{
                    departurestation_name: ILike(`%${search}%`),
                }, {
                    returnstation_name: ILike(`%${search}%`),
                }],
                order: {
                    [sortField]: sort.direction
                },
                skip: offset,
                take: limit,
            })
        const result = { journeyList: filteredJourneys, total: count }
        return result
    }

    const [journeys, journeysCount] = await journeyData.findAndCount({
        order: {
            [sortField]: sort.direction
        },
        skip: offset,
        take: limit
    })
    const result = { journeyList: journeys, total: journeysCount }
    return result;
}

const getJourney = async (journeyId: number): Promise<Journey | null> => {
    const journey = await journeyData.findOneBy({ id: journeyId });
    return journey;
}


export default { getAllJourneys, getJourney };