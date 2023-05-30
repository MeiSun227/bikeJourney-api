import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
import "reflect-metadata";
import { Station } from "../Station";
import { Journey } from "../Journey";
import { AppDataSource } from "../data-source";

const stationRepository = AppDataSource.getRepository(Station);
const journeyRepository = AppDataSource.getRepository(Journey);

export const stationDB = async(csvFilename: string) => {
  fs.createReadStream(path.resolve(__dirname, "", csvFilename))

    .pipe(csv.parse({ headers: true }))

    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      const station = new Station();

      (station.FID = Number(row.FID)),
        (station.id = Number(row["ID"])),
        (station.name = row.Name as string),
        (station.address = row.Osoite as string),
        (station.city = row["Kaupunki"] as string),
        (station.operator = row["Operaattor"] as string),
        (station.capacities = Number(row["Kapasiteet"])),
        (station.x = Number(row["x"])),
        (station.y = Number(row["y"]));
      await stationRepository.save(station);
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};

export const journeyDB = async (csvFilename: string) => {
  fs.createReadStream(path.resolve(__dirname, "", csvFilename))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      if (Number(row["Duration (sec.)"]) < 10) {
        return;
      }
      if (Number(row["Covered distance (m)"]) < 10) {
        return;
      }

      const journey =  new Journey();

      (journey.departure = row.Departure as Date),
        (journey.return = row.Return as Date),
        (journey.departurestation_id = Number(row["Departure station id"])),
        (journey.departurestation_name = row["Departure station name"] as string),
        (journey.returnstation_id = Number(row["Return station id"])),
        (journey.returnstation_name = row["Return station name"] as string),
        (journey.covereddistance = Number(row["Covered distance (m)"])),
        (journey.duration = Number(row["Duration (sec.)"]));
     await  journeyRepository.save(journey);
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};
