const express = require("express")
const router = express.Router()
const { validationResult } = require("express-validator")

const { User } = require("../models/index")

// validators
const newUserValidator = require("../validation/newUserValidator")

// controllers
const UserController = new (require("../controllers/UserController"))()

router.get("/users", (req, res, next) => {
  // get a user
  return res.json({
    message: "This route is still a work in progress!",
    route: "GET currently authenticated user",
  })
})
router.post("/users", newUserValidator, (req, res, next) =>
  UserController.usersPOST(req, res, next)
)

module.exports = router
