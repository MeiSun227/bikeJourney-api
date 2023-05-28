import { ILike } from "typeorm/find-options/operator/ILike";
import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";
import { Station } from "../entity/Station";

const stationData = AppDataSource.getRepository(Station);
const journeyData = AppDataSource.getRepository(Journey);

export type SortType = {
  field: string;
  direction: string;
};

export type IJourney = {
  journeyList: Journey[];
  total: number;
};

const getAllJourneys = async (
  pageSize: number,
  pageNumber: number,
  search: string | undefined,
  sort: SortType
): Promise<IJourney> => {
  const offset = pageSize * pageNumber;
  const limit = pageSize;
  const sortField = sort.field ? sort.field : "departurestation_name";
  if (search && search !== "undefined") {
    const [filteredJourneys, count] = await journeyData.findAndCount({
      where: [
        {
          departurestation_name: ILike(`%${search}%`),
        },
        {
          returnstation_name: ILike(`%${search}%`),
        },
      ],
      order: {
        [sortField]: sort.direction,
      },
      skip: offset,
      take: limit,
    });
    const result = { journeyList: filteredJourneys, total: count };
    return result;
  }

  const [journeys, journeysCount] = await journeyData.findAndCount({
    order: {
      [sortField]: sort.direction,
    },
    skip: offset,
    take: limit,
  });
  const result = { journeyList: journeys, total: journeysCount };
  return result;
};

const getJourney = async (journeyId: number): Promise<Journey | null> => {
  const journey = await journeyData.findOneBy({ id: journeyId });
  return journey;
};

const addJourney = async (entry: Journey):Promise<Journey> => {
  const departure = new Date();
  const returnDate = new Date();
  const loanTime = new Date(
    returnDate.setMinutes(departure.getMinutes() + Math.random())
  );
  const duration = returnDate.getTime() - departure.getTime();
  entry.departure = departure;
  entry.return = loanTime;
  entry.duration = duration;

  const stationA = (await stationData.findOneBy({
    id: entry.departurestation_id,
  })) as Station;
  const latA = (stationA.y * Math.PI) / 180;
  const lonA = stationA.x;
  const stationB = (await stationData.findOneBy({
    name: entry.returnstation_name,
  })) as Station;
  const lonB = stationB.x;
  const latB = (stationB.y * Math.PI) / 180;
  const R = 6371e3;
  const deltaLon = lonB - lonA;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const d =
    Math.acos(
      Math.sin(latA) * Math.sin(latB) +
        Math.cos(latA) * Math.cos(latB) * Math.cos(deltaLambda)
    ) * R;
  entry.covereddistance = d;
  const newJourneyEntry = journeyData.create(entry);
  const newJounryLoan = await journeyData.save(newJourneyEntry);
  return newJounryLoan;
};

const deleteJourney = async (id: number): Promise<void> => {
  await journeyData.delete({ id: id });
};

export default { getAllJourneys, getJourney, addJourney, deleteJourney };
