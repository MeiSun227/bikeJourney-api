import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";

const journeyData = AppDataSource.getRepository(Journey)

//type sortDirection = "ASC" | "DESC"

// type sortType = {
//     key: string;
//     value: sortDirection;
// }

export type IJouney = {
    journeyList: Journey[]
    total: number
}



const getAllJourneys = async (pageSize: number, pageNumber: number, search: string | undefined): Promise<IJouney | Journey[]> => {
    const offset = pageSize * pageNumber
    const limit = pageSize * (pageNumber + 1)

    if (search !== '' && search !== undefined) {
        const [filteredJourneys, count] = await journeyData
        .createQueryBuilder("journey")
        .where("journey.departurestation_name LIKE :search OR journey.returnstation_name LIKE :search", { search: `%${search}%` })
        .skip(offset)
        .limit(limit)
  
        .getRawMany()
        /*const [filteredJourneys, count] = await journeyData
            .findAndCount({
                where: [{
                    departurestation_name: ILike(`%${search}%`),
                }, {
                    returnstation_name: ILike(`%${search}%`),
                }],
                order: {
                    [sort.key]: sort.value
                },
                skip: offset,
                take: limit,
            })*/
        const result = { journeyList: filteredJourneys, total: count }
        return result
    }

    const [journeys, journeysCount] = await journeyData.findAndCount({
        skip: offset,
        take: limit,
    })
    const result = { journeyList: journeys, total: journeysCount }
    return result;
}

const getJourney = async (journeyId: number): Promise<Journey | null> => {
    const journey = await journeyData.findOneBy({ id: journeyId });
    return journey;
}


export default { getAllJourneys, getJourney };