'use strict'


// middleware that authorizes only admins 

class AdminMiddleware {
  async handle({ request,response}, next) {
    // get user using the token
    // check if the usertype is an admin
    if (request.user.$attributes.userType !== "admin") {

      return response.status(404).json({
        message: 'Unauthorized to access this route, admin only'
      })
    }

    await next()
  }
}

module.exports = AdminMiddleware
