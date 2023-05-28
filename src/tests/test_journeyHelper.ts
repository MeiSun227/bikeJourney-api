import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";

const journeyData = AppDataSource.getRepository(Journey);

const initialJourneys = [
  {
    departure: "2023-07-06T04:02:50.000Z",
    return: "2023-07-06T04:07:18.000Z",
    departurestation_id: 12,
    departurestation_name: "KissuMaa",
    returnstation_id: 13,
    returnstation_name: "Jäätalo",
    covereddistance: 100,
    duration: 200,
  },
  {
    departure: "2021-07-06T04:02:50.000Z",
    return: "2021-07-06T04:07:18.000Z",
    departurestation_id: 12,
    departurestation_name: "Mummitalo",
    returnstation_id: 13,
    returnstation_name: "Jäätalo",
    covereddistance: 100,
    duration: 200,
  },
];

const journeyInDb = async () => {
  const journeys = await journeyData.find({});
  return journeys.map((journey) => journey);
};

export default { initialJourneys, journeyInDb };
