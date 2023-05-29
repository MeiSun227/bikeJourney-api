# BikeJourney-api

This is a Express application that serves as a starting point for building a Bike data web applications. It provides a basic setup for handling routes, middleware, and server configuration. Data is using from HSL. 

## Table Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API usage](#aPIUsage)
- [Testing](#testing)

## Features
- **Journey Management**: Create, read, update, and delete journey table.
- **Station Management**: Create, read, update, and delete station table.
- **Validation**: Validate data and types to prevent data inconsistencies.
- **Error Handling**: Handle and respond to errors with appropriate status codes and error messages.
- **Database Integration**: Utilize Postgresql for data storage and retrieval.
- **Environment Configuration**: Use environment variables for configuration settings.
- **Testing**: Includes a comprehensive test suite using Jest and Supertest.

## Technologies
- Express.js: Fast, unopinionated, and minimalist web framework for Node.js.
- PostgreQl: Relational database for storing and managing data.
- TypeORM: 
- Docker
- Supertest: HTTP assertions for integration testing.

## Installation
- git clone https://github.com/MeiSun227/bikeJourney-api.git
- npm install
- docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres (develop)
- docker run --name some-postgres-test -e POSTGRES_PASSWORD=mysecretpassword -d postgres (test)

## Usage
- npm run dev
- Read csv 
  - station data: READ_STATION=true npm run dev
  - journey data: ...READ_JOURNEY_DATA= true npm run dev

## API Endpoints
### Station API Endpoints
- search station with query search, search value must be string
 - example: [http://localhost:3000/api/station?search=](http://localhost:3000/api/station?search=Auringonkatu)
 
 ### Journey API Endpoints
 - Get all journey need to give pagenumber and page size as variable, because the big data set can spend too much time to load
  - example: http://localhost:3000/api/journey?pagenumber=0&pagesize=5&sortDirection=asc
 
 - Search journey endpoint is using query search, search value must be string
  - example: http://localhost:3000/api/journey?pagenumber=0&pagesize=5&sortDirection=asc&search= 

<p>In the repository, you can find all the example endpoints that can be tested using Visual Studio Code Rest</p>

## Testing
- Run test
  - npm run test (all test)
  - npm test -- tests/station_api.test.tsx (single test)








