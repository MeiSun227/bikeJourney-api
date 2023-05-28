import { AppDataSource } from "../entity/data-source";
import { Station } from "../entity/Station";

const stationData = AppDataSource.getRepository(Station);

const initialStation = [
  {
    FID: 350,
    id: 12,
    name: "KissuMaa",
    address: "KissuPalku 1",
    city: "Helsinki",
    operator: "CityBike Finland",
    capacities: 2,
    x: 11.82895,
    y: 23.175233,
  },
];

const stationsInDb = async () => {
  const stations = await stationData.find({});
  return stations.map((station) => station);
};

export default { initialStation, stationsInDb };
