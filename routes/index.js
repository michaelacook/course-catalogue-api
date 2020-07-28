const express = require("express")
const router = express.Router()

// validators
const newUserValidator = require("../validation/newUserValidator")

// controllers
const UserController = new (require("../controllers/UserController"))()
const CourseController = new (require("../controllers/CourseController"))()

router.get("/users", (req, res, next) =>
  UserController.usersGET(req, res, next)
)
router.post("/users", newUserValidator, (req, res, next) =>
  UserController.usersPOST(req, res, next)
)
router.get("/courses/", (req, res, next) =>
  CourseController.coursesGET(req, res, next)
)
router.get("/courses/:id", (req, res, next) =>
  CourseController.coursesListGET(req, res, next)
)
router.post("/courses/", (req, res, next) =>
  CourseController.coursesPOST(req, res, next)
)
router.put("/courses/:id", (req, res, next) =>
  CourseController.coursesPUT(req, res, next)
)
router.delete("/courses/:id", (req, res, next) =>
  CourseController.coursesDELETE(req, res, next)
)

module.exports = router
