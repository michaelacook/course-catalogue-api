/*
Authorization middleware
Handles checking of user ownership of a resource 
*/

const CourseService = new (require("../services/CourseService"))()

module.exports = () => {
  /**
   * Uses the CourseService to check if the currently authenticated user
   * is the owner of the resource they are attempting to modify or delete
   * If they are not the owner, return a 403 Forbidden status
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next middleware function
   */
  return async function (req, res, next) {
    const userId = req.user.id
    const courseId = req.params.id
    const owner = await CourseService.isOwner(userId, courseId)
    if (!owner) {
      return res.status(403).end()
    }
    next()
  }
}
