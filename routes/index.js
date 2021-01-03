const express = require("express")
const router = express.Router()

// authentication
const auth = require("../auth/authenticator")()
// authorization
const authorize = require("../auth/authorizer")()

// validation chains
const newUserValidator = require("../validation/newUserValidator")
const courseValidator = require("../validation/courseValidator")

// controllers
const UserController = new (require("../controllers/UserController"))()
const CourseController = new (require("../controllers/CourseController"))()

router.get("/users", auth, (req, res, next) =>
  UserController.usersGET(req, res, next)
)
router.post("/users", newUserValidator, (req, res, next) =>
  UserController.usersPOST(req, res, next)
)
router.delete("/users/:id", auth, (req, res, next) =>
  UserController.usersDELETE(req, res, next)
)
router.get("/courses/", (req, res, next) =>
  CourseController.coursesGET(req, res, next)
)
router.get("/courses/:id", (req, res, next) =>
  CourseController.coursesListGET(req, res, next)
)
router.post("/courses/", auth, courseValidator, (req, res, next) =>
  CourseController.coursesPOST(req, res, next)
)
router.put("/courses/:id", auth, authorize, courseValidator, (req, res, next) =>
  CourseController.coursesPUT(req, res, next)
)
router.delete("/courses/:id", auth, authorize, (req, res, next) =>
  CourseController.coursesDELETE(req, res, next)
)

module.exports = router
