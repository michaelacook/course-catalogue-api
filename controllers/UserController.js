/* 
Encapsulates the logic of retrieving the correct data 
given the current request and returning it to the client

The naming convention for methods takes the following format:
  modelNameHTTPVERB
*/

const UserService = new (require("../services/UserService"))()
const { validationResult } = require("express-validator")

module.exports = class UserController {
  /**
   * Handle control for POST to the /api/users route
   * express-validator validation chains are passed to the route
   * handler, so any errors are available and are used if
   * validation fails
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Function} next - next function in the middleware chain
   */
  async usersPOST(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((error) => error.msg),
        })
      }
      const userAlreadyExists = await UserService.userExists(
        req.body.emailAddress
      )
      if (userAlreadyExists) {
        return res.status(400).json({
          error: "A user with the provided email address already exists.",
        })
      }
      await UserService.addUser(req.body)
      return res.status(201).location("/").end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for GET to /api/users route
   * Returns the currently authenticated user
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async usersGET(req, res, next) {
    try {
      return res.status(200).json({ user: req.user })
    } catch (error) {
      next(error)
    }
  }

  async usersDELETE(req, res, next) {
    try {
      const id = req.params.id
      await UserService.deleteUser(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
