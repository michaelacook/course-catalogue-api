/*
Handles the validation chains responsible for 
validating data sent via POST to add a new User
*/

const { body } = require("express-validator")

module.exports = [
  body("firstName")
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isAlpha()
    .withMessage("Please provide a value for first name."),
  body("lastName")
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isAlpha()
    .withMessage("Please provide a value for last name."),
  body("emailAddress")
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isEmail()
    .withMessage("Please provide an email address."),
  body("password")
    .exists({
      checkNull: true,
      checkFalsy: true,
    })
    .isAlphanumeric()
    .isLength({
      min: 6,
      max: undefined,
    })
    .withMessage(
      "Please provide an alpha-numeric password at least six characters long."
    ),
]
