const CourseService = new (require("../services/CourseService"))()
const { validationResult } = require("express-validator")

module.exports = class CourseController {
  /**
   * Handle control for route for /api/courses GET
   * Returns a JSON array of all courses
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @param {Function} next - next middleware
   */
  async coursesGET(req, res, next) {
    try {
      const courses = await CourseService.getCourses()
      return res.status(200).json(courses)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for route /api/courses/:id GET
   * Returns a JSON object for a single course
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async coursesListGET(req, res, next) {
    try {
      const id = req.params.id
      const course = await CourseService.getCourse(id)
      return res.status(200).json({ course })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for the /api/courses POST
   * Add a new course to the data store
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async coursesPOST(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((error) => error.msg),
        })
      }
      const id = await CourseService.addCourse(req.body)
      return res.status(201).location(`/api/courses/${id}`).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /api/courses/:id PUT
   * Update a course record
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async coursesPUT(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((error) => error.msg),
        })
      }
      const id = req.params.id
      await CourseService.updateCourse(id, req.body)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle control for /api/courses/:id DELETE
   * Delete a course
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  async coursesDELETE(req, res, next) {
    try {
      const id = req.params.id
      await CourseService.deleteCourse(id)
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
