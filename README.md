# Course Catalogue API
A REST API for a mock course catalogue. Project 9 Full Stack JavaScript.

## Architecture 
This project makes use of an architecture emphasizing the Separation of Concerns. You will not find any logic in route handlers. The breakdown of the structure of the program is as follows: 

- `models` - Define the data and data associations 
- `services` - Layer handling business logic on data queried from the data store
- `controllers` - Layer handle the logic of querying Services and returning the correct data to the client 
- `middleware` - Handle middleware actions performed on the request and response objects before they are handled by Controllers 
- `validation` - Handle the definition of validation chain functions
- `routes` - Handle routing of HTTP requests