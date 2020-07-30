# Course Catalogue API

A REST API for a mock course catalogue. Project 9 Full Stack JavaScript.

## Built With 
* Node.js
* Express.js 
* Sequelize.js

## Architecture
This project makes use of an architecture that strongly emphasizes the Separation of Concerns. You will not find any logic in route handlers, for instance.

```
.
├── app.js
├── auth - modules for authentication and authorization
├── config - configure database connectivity
├── controllers - classes for handling control of resources
├── migrations - database migrations
├── models - table models
├── routes - application routes
├── seed - generating seed data
├── services - classes for interating with table models
└── validation - modules for validating data on the request payload
```

Controllers handle the resources the application returns upon requests. Controllers call methods on Services, which perform tasks related to querying the database and processing business data. Modules found in `auth` are middleware modules that handle authentication and authorization. `validation` contains middleware modules for data validation. This architecture might seem complex to some, but it makes growing the application and adding features infinitely easier, and it is my preference to keep concerns separated as much as possible. This pattern mimicks patterns found in frameworks for languages like C#, Java and PHP. 

## Endpoints
