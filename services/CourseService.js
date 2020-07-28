const { Course } = require("../models/index")

module.exports = class CourseService {
  /**
   * Add a new course to the data store
   * @param {Object} req.body destructured
   * @return {Promise} id PK for newly added course
   */
  async addCourse({
    title,
    description,
    estimatedTime,
    materialsNeeded,
    userId,
  }) {
    let id
    await Course.sync()
    await Course.create({
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    })
      .then((course) => {
        id = course.id
      })
      .catch((err) => {
        return Promise.reject(err)
      })
    if (id) return Promise.resolve(id)
  }

  /**
   * Gets a list of all courses in the catalogue
   * @return {Promise}
   */
  async getCourses() {
    await Course.sync()
    const courses = await Course.findAndCountAll()
    if (courses) {
      return Promise.resolve(courses)
    }
    return Promise.reject()
  }

  /**
   * Get a single course by it's id
   * @param {Number} id - primary key for record
   * @return {Promise} course data
   */
  async getCourse(id) {
    await Course.sync()
    const course = await Course.findByPk(id)
    if (course) {
      return Promise.resolve(course)
    }
    return Promise.reject()
  }

  /**
   * Update a course
   * @param {Number} id - course PK
   * @param {Object} HTTPbody - http POST payload
   */
  async updateCourse(id, HTTPbody) {
    await Course.sync()
    const course = await Course.findByPk(id)
    for (let key in HTTPbody) {
      if (key !== "id") {
        course[key] = HTTPbody[key]
        await course.save()
      }
    }
  }

  /**
   * Delete a course
   * @param {Number} id - primary key for record
   * @return {Void}
   */
  async deleteCourse(id) {
    await Course.sync()
    const course = await Course.findByPk(id)
    await course.destroy()
  }
}
