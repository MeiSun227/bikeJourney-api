import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import "reflect-metadata";

import { AppDataSource } from "../data-source";
import { Station } from '../Station';
import { Journey } from '../Journey';


const stationRepository = AppDataSource.getRepository(Station)
const journeyRepository = AppDataSource.getRepository(Journey)

export const stationDB = async (csvFilename: string) => {
    fs.createReadStream(path.resolve(__dirname, '', csvFilename))
   
        .pipe(csv.parse({ headers: true }))
     
        .on('error', error => console.error(error))
        .on('data', row=> {
          
            const station = new Station()

            station.FID = row.FID,
                station.id = Number(row['ID']),
                station.name = row.Name,
                station.address = row.Osoite,
                station.city = row['Kaupunki'],
                station.operator = row['Operaattor'],
                station.capacities = Number(row['Kapasiteet']),
                station.x = Number(row['x']),
                station.y = Number(row['y'])
            stationRepository.save(station)

        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
}

export const journeyDB = async (csvFilename: string) => {
    fs.createReadStream(path.resolve(__dirname, '', csvFilename))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', row => {
            if (Number(row.Duration) < 10) {
                return;
            }
            if (Number(row.Covereddistance) < 10) {
                return;
            }

            const journey = new Journey()

            journey.departure = row.Departure,
                journey.return = row.Return,
                journey.departurestation_id = Number(row['Departure station id']),
                journey.departurestation_name = row['Departure station name'],
                journey.returnstation_id = Number(row['Return station id']),
                journey.returnstation_name = row['Return station name'],
                journey.covereddistance = Number(row['Covered distance (m)']),
                journey.duration = Number(row['Duration (sec.)'])

            journeyRepository.save(journey)
        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
}


