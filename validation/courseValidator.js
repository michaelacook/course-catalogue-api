/*
Handles the validation chains responsible for 
validating data sent via POST and PUT to course routes 
*/

const { body } = require("express-validator")

module.exports = [
  body("title")
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .withMessage("Please provide a title."),
  body("description")
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .withMessage("Please provide a course description."),
]
