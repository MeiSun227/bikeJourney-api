import { AppDataSource } from "./src/entity/data-source";
import "reflect-metadata";
import { journeyDB, stationDB } from "./src/entity/service/init-data";
import app from "./app";

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
  try {
    await AppDataSource.initialize();
    if (process.env.READ_DATA) {
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