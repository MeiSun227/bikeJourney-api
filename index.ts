import { AppDataSource } from './src/entity/data-source';
import "reflect-metadata";
import { journeyDB, stationDB } from './src/entity/service/init-data';
import app from './app';


const PORT = 3000;


app.listen(PORT, async () => {
  await AppDataSource.initialize()
  console.log(`Server running on port ${PORT}`);
  if (process.env.READ_DATA) {
    await stationDB('stations.csv')
  }
  if(process.env.READ_DATA_JOURNEY){
    await journeyDB('2021-07.csv')
  }
});