import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";
import { Station } from "../entity/Station";

const stationData = AppDataSource.getRepository(Station)
const journeyData = AppDataSource.getRepository(Journey)


const getAllStations = async (): Promise<Station[]> => {
    const allStations = await stationData.find();
    return allStations;
};

const getStationByName = async (name: string): Promise<Station | null> => {
    const station = await stationData.findOneBy({ name });
    return station;
};

const getStationData = async (stationId: number): Promise<{}> => {
    const station = await stationData.findOneBy({ id: stationId }) as Station;
    const returnCount = await journeyData.countBy({ returnstation_id: station.id })
    const departureCount = await journeyData.countBy({ departurestation_id: station.id })
    const result = { name: station.name, address: station.address, capacity: station.capacities, city: station.city, returnCount, departureCount, count: returnCount + departureCount };
    return result;
}

const mostPopularDepartureStation = async (): Promise<Journey[]> => {

    const departuresCount = await journeyData
        .createQueryBuilder("journey")
        .select("COUNT(journey.departurestation_id)", "count")
        .orderBy("count", "DESC")
        .addSelect("journey.departurestation_name")
        .addSelect("AVG(journey.covereddistance)", "avgDeparture")
        .groupBy("journey.departurestation_name")
        .orderBy("count", "DESC")
        .limit(5)
        .getRawMany()

    return departuresCount
}

const mostPopularReturnStation = async (): Promise<Journey[]> => {

    const returnsCount = await journeyData
        .createQueryBuilder("journey")
        .select("COUNT(journey.returnstation_id)", "count")
        .orderBy("count", "DESC")
        .addSelect("journey.returnstation_name")
        .groupBy("journey.returnstation_name")
        .orderBy("count", "DESC")
        .limit(5)
        .getRawMany()

    return returnsCount
}

const updateStation = async (stationId: number, entry: Station): Promise<Station | null> => {
    let station = await stationData.findOneBy({
        id: stationId,
      });
      if (station) {
        stationData.merge(station, entry);
        station = await stationData.save(station);
      }
      return station;
    };

const addStation = async (entry:Station):Promise<Station> =>{
    const newStation = await stationData.save(entry);
    return  newStation;
    
}
export { getAllStations, getStationByName, getStationData, mostPopularDepartureStation, mostPopularReturnStation, updateStation, addStation } 
