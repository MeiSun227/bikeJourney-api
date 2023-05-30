import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";
import { Station } from "../entity/Station";

interface stationResult{
  name: string
  address: string
  capacity: number
  city: string
  returnCount:number
  departureCount:number
  count: number
  x: number,
  y: number
}

interface PopularStation {
  name:string
  count:number
  avgDeparture:number
}

const stationData = AppDataSource.getRepository(Station);
const journeyData = AppDataSource.getRepository(Journey);

const getAllStations = async (
  search: string | undefined
): Promise<Station[]> => {
  if (search && search !== "underfined") {
    const stationsList = await stationData
      .createQueryBuilder("station")
      .where("station.name ilike :search OR station.address ilike :search", {
        search: `%${search}%`,
      })
      .getMany();
    return stationsList;
  }
  const allStations = await stationData.find();
  return allStations;
};

const getStationData = async (stationId: number): Promise<stationResult> => {
  const station = (await stationData.findOneBy({ id: stationId })) as Station;
  const returnCount = await journeyData.countBy({
    returnstation_id: station.id,
  });
  const departureCount = await journeyData.countBy({
    departurestation_id: station.id,
  });
  const result = {
    name: station.name,
    address: station.address,
    capacity: station.capacities,
    city: station.city,
    returnCount,
    departureCount,
    count: returnCount + departureCount,
    x: station.x,
    y: station.y,
  };
  return result;
};

const mostPopularDepartureStation = async (): Promise<PopularStation[]> => {
  const popularStations: PopularStation[] = await journeyData
    .createQueryBuilder("journey")
    .select("COUNT(journey.departurestation_id)", "count")
    .orderBy("count", "DESC")
    .addSelect("journey.departurestation_name")
    .addSelect("AVG(journey.covereddistance)", "avgDeparture")
    .groupBy("journey.departurestation_name")
    .orderBy("count", "DESC")
    .limit(5)
    .getRawMany();


  return popularStations;
};

const mostPopularReturnStation = async (): Promise<PopularStation[]> => {
  const popularReturnStations:PopularStation[]  = await journeyData
    .createQueryBuilder("journey")
    .select("COUNT(journey.returnstation_id)", "count")
    .orderBy("count", "DESC")
    .addSelect("journey.returnstation_name")
    .groupBy("journey.returnstation_name")
    .orderBy("count", "DESC")
    .limit(5)
    .getRawMany();

  return popularReturnStations;
};

const updateStation = async (entry: Station): Promise<Station | null> => {
  let station = await stationData.findOneBy({
    id: entry.id,
  });
  if (station) {
    stationData.merge(station, entry);
    station = await stationData.save(station);
  }
  return station;
};

const addStation = async (entry: Station): Promise<Station> => {
  const newStation = await stationData.save(entry);
  return newStation;
};
const deleteStation = async (id: number): Promise<void> => {
  await stationData.delete({ id: id });
};

export {
  getAllStations,
  getStationData,
  mostPopularDepartureStation,
  mostPopularReturnStation,
  updateStation,
  addStation,
  deleteStation,
};
