/* Handles Basic Authentication */

const auth = require("basic-auth")
const bcrypt = require("bcryptjs")
const UserService = new (require("../services/UserService"))

module.exports = () => {
  /**
   * Parse the HTTP Authorization header
   * Authenticate current user
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @return {Object} req on authenticate
   * @return {Boolean} false on fail
   */
  return async function (req, res, next) {
    let errorMessage
    const credentials = auth(req)
    if (credentials) {
      const { name, pass } = credentials
      const user = await UserService.getUser(name)
      if (user) {
        const authed = bcrypt.compareSync(pass, user.password)
        if (authed) req.user = user
      } else {
        errorMessage = `Authentication failed for username: ${name}`
      }
    } else {
      errorMessage = "Auth header not found."
    }
    if (errorMessage) {
      console.warn(errorMessage)
      return res.status(401).json({ message: "Access Denied." })
    }
    next()
  }
}
