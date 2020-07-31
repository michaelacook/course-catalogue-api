/*
Encapsulates business logic of interating with the User model 
All methods query User and return the desired data or boolean 
where necessary
*/

const { User } = require("../models/index")
const bcrypt = require("bcryptjs")

module.exports = class UserService {
  /**
   * Add a new user to the data store
   * Uses bcryptjs to generate a password hash
   * @param {Object} req.body destructured
   * @return {Promise} rejected if fail, resolved otherwise
   */
  async addUser({ firstName, lastName, emailAddress, password }) {
    password = bcrypt.hashSync(password, 8)
    await User.sync()
    await User.create({
      firstName,
      lastName,
      emailAddress,
      password,
    }).catch((err) => {
      return Promise.reject(err)
    })
    return Promise.resolve()
  }

  /**
   * Get a user by associated email
   * @param {String} email - user email
   * @return {Promise} user
   */
  async getUser(email, truncated=true) {
    await User.sync()
    const user = await User.findOne({
      where: {
        emailAddress: email,
      },
    })
    if (user) return Promise.resolve(user)
    return Promise.reject()
  }

  /**
   * Determine if a user exists in the database
   * @param {String} email
   * @return {Boolean} true if user exists, else false
   */
  async userExists(email) {
    await User.sync()
    const user = await User.findOne({
      where: {
        emailAddress: email,
      },
    })
    if (user) {
      return true
    }
    return false
  }
}
