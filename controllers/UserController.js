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
      await UserService.addUser(req.body)
      return res.location("/").end()
    } catch (error) {
      next(error)
    }
  }
}
