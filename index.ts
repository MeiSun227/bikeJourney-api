import "reflect-metadata";
import { journeyDB, stationDB } from "./src/entity/service/init-data";
import app from "./app";
import { AppDataSource } from "./src/entity/data-source";

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  try {
    await AppDataSource.initialize();
    if (process.env.READ_STATION) {
      await stationDB("stations.csv");
    }
    if (process.env.READ_DATA_JOURNEY) {
      await journeyDB("2021-07.csv");
    }
  } catch (error) {
    return error;
  }
  console.log(`Server running on port ${PORT}`)
});