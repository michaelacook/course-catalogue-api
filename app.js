"use strict"

// load modules
const express = require("express")
const morgan = require("morgan")
const router = require("./routes/index")
const bodyParser = require("body-parser")

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true"

// create the Express app
const app = express()

// make the HTTP POST payload available on req
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// setup morgan which gives us http request logging
app.use(morgan("dev"))

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  })
})

// pass request and response through router
app.use("/api", router)

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  })
})

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`)
  }
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

// set our port
app.set("port", process.env.PORT || 5000)

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`)
})
