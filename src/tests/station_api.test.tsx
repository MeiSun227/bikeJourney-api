import app from "../../app";
import { AppDataSource } from "../entity/data-source";
import { Station } from "../entity/Station";
import helper from "./test_stationHelper";

const supertest = require("supertest");

const api = supertest(app);

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  const stationData = AppDataSource.getRepository(Station);
  await stationData.save(helper.initialStation);
});

afterEach(async () => {
  await AppDataSource.getRepository(Station).delete({});
});

test("station is returned as json", async () => {
  await api
    .get("/api/station")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all stations are returned", async () => {
  const response = await api.get("/api/station");
  expect(response.body).toHaveLength(helper.initialStation.length);
});

test("a valid station can be added", async () => {
  const newStaion = {
    FID: 310,
    name: "MuMaa",
    address: "Mumaa 1",
    city: "Helsinki",
    operator: "CityBike Finland",
    capacities: 34,
    x: 11.82221,
    y: 23.667,
  };

  await api
    .post("/api/station")
    .send(newStaion)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const stationsAtEnd = await helper.stationsInDb();
  expect(stationsAtEnd).toHaveLength(helper.initialStation.length + 1);

  const stationObject = stationsAtEnd.map((station) => station.name);
  expect(stationObject[1]).toBe("MuMaa");
});

test("a specific station can be viewed", async () => {
  const stationsAtStart = await helper.stationsInDb();
  const stationToView = stationsAtStart[0];
  const expectedResult = {
    name: "KissuMaa",
    address: "KissuPalku 1",
    capacity: 2,
    city: "Helsinki",
    returnCount: 0,
    departureCount: 0,
    count: 0,
    x: "11.82895",
    y: "23.175233",
  };

  const resultStation = await api
    .get(`/api/station/${stationToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultStation.body).toEqual(expectedResult);
});
