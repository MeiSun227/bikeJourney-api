import app from "../../app"
import { AppDataSource } from "../entity/data-source";
import { Station } from "../entity/Station";

const supertest = require('supertest')

const api = supertest(app)
const initialStation = [{
  FID: 350,
  id: 12,
  name: "KissuMaa",
  address: "KissuPalku 1",
  city: "Helsinki",
  operator: "CityBike Finland",
  capacities: 2,
  x: 11.82895,
  y: 23.175233
}]

beforeAll(async () => {
  await AppDataSource.initialize()

})

beforeEach(async () => {
  let stationData = AppDataSource.getRepository(Station)
  await stationData.save(initialStation)
});

afterEach(async () => {
  await AppDataSource.getRepository(Station).delete({});
})

test('station are returned as json', async () => {
  await api
    .get('/api/station')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all stations are returned', async () => {
  const response = await api.get('/api/station')
  expect(response.body).toHaveLength(initialStation.length)
})

test('a valid station can be added', async () => {
  const newStaion = {
    FID: 310,
    name: "MuMaa",
    address: "Mumaa 1",
    city: "Helsinki",
    operator: "CityBike Finland",
    capacities: 34,
    x: 11.82221,
    y: 23.667
  }

  await api
    .post('/api/station')
    .send(newStaion)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/station')
  const stationObject = response.body.map((station: Station)=>station)
  expect(response.body).toHaveLength(initialStation.length + 1)
  expect(stationObject[1].name).toContain("MuMaa")
})

