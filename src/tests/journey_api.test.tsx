import app from "../../app";
import { AppDataSource } from "../entity/data-source";
import { Journey } from "../entity/Journey";
import journeyHelper from "./test_journeyHelper";

const supertest = require("supertest");

const journeyApi = supertest(app);

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  let journeyData = AppDataSource.getRepository(Journey);
  await journeyData.save(journeyHelper.initialJourneys);
});

afterEach(async () => {
  await AppDataSource.getRepository(Journey).delete({});
});

test("journey response JSON", async () => {
  const pagenumber = 0;
  const pagesize = 5;

  await journeyApi
    .get(`/api/journey?pagenumber=${pagenumber}&pagesize=${pagesize}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a specific journey will return base on search", async () => {
  await journeyHelper.journeyInDb();
  const searchValue = "Kala";
  const pagenumber = 0;
  const pagesize = 5;
  const expectedBody = {
    journeyList: [],
    total: 0,
  };
  const response = await journeyApi
    .get(
      `/api/journey?pagenumber=${pagenumber}&pagesize=${pagesize}&search=${searchValue}`
    )
    .expect(200);
  expect(response.status).toEqual(200);
  expect(response.body).toEqual(expectedBody);
});

test("a journey can be deleted", async () => {
  const journeyAtStart = await journeyHelper.journeyInDb();
  const journeyToDelete = journeyAtStart[0];

  await journeyApi.delete(`/api/journey/${journeyToDelete.id}`).expect(204);
  const journeyAtEnd = await journeyHelper.journeyInDb();

  expect(journeyAtEnd).toHaveLength(journeyHelper.initialJourneys.length - 1);

  const journeys = journeyAtEnd.map((journey) => journey);
  expect(journeys).not.toContain(journeyToDelete);
});
