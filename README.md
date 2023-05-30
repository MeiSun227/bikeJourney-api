# BikeJourney-api

This Express application serves as a robust foundation for developing Bike data web applications. It offers a comprehensive setup for efficiently managing routes, middleware, and server configuration. The application utilizes data sourced from HSL (Helsinki Regional Transport Authority) and leverages a relational database. To ensure reliable testing, the application integrates SuperTest, a powerful library for HTTP testing. With this solid groundwork, developers can seamlessly build feature-rich Bike data web applications.

Feel free to customize the description further based on your specific requirements and application features.

## Table Contents
- [Features](#features)
- [Configuration](#configuration)
- [API](#api)
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
- TypeORM
- Docker
- Supertest: HTTP assertions for integration testing.

## Configuration
-  ### `git clone https://github.com/MeiSun227/bikeJourney-api.git`
    Clone the project into local machine. 

- ### `npm install`
    Install all the packages

- ### `docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`
    Configure Developement database 

-  ### `docker run --name some-postgres-test -e POSTGRES_PASSWORD=mysecretpassword -d postgres`  
  Configure Test database

- ### `npm run dev`
    Start the Express server 

- Read csv 
  - ### `READ_STATION=true npm run dev`
    This comman is to read station data from csv

  - ## #`READ_JOURNEY_DATA= true npm run dev`
   This comman is to read station data from csv

## API 
### Station API Endpoints
 - ### `GET/ api/station?search= `
    This endpoint is to fetch all stations and together with search value as variable.

 - ### `GET/ api/station/:id` 
    This endpoint is to fetch single station information by station id.

 - ### `GET/ api/departure-station`
    This endpoint is to top 5 popular departure stations.

  - ### `GET/ api/return-station`
    This endpoint is to top 5 popular return stations.

  - ### `PUT/ api/station/:id`
    This endpoint is to update any field of stations.
  
  - ### `POST/ api/station/`
    This endpoint is to add new station into database.

  - ### `DELETE/ api/station/:id`
   This endpoint is to delete single station by station id.

 - Example:http://localhost:3000/api/station?search=Auringonkatu

 
 ### Journey API Endpoints
  - ### `GET/api/journey?pagenumber=&pagesize=&sortDirection=asc&search=`
    This endpoint is used to fetch all journeys. Since the journey data is extensive, pagination is implemented. The frontend needs to provide variables such as pagenumber and pagesize. Additionally, it can be extended to include sorting and searching functionality.

 - ### `GET/ api/journey/:id `
    This endpoint is to fetch single journey information by id.
  
  - ### `DELETE/ api/journey/:id`
   This endpoint is to delete single journey by id.

  - Example: http://localhost:3000/api/journey?pagenumber=0&pagesize=5&sortDirection=asc&search= 


## Testing
- Run test
  - ### `npm run test` 
    this will run all the tests in the test folder
  - ### `npm test -- tests/station_api.test.tsx`
    this is only run single test case


