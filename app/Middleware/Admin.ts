'use strict'


// middleware that authorizes only admins 

class AdminMiddleware {
  async handle({ response,auth}, next) {
    // get user using the token
    const user = auth.use("api").user;
    console.log(user.$attributes.userType)
    // check if the usertype is an admin
    if (user.$attributes.userType !== "admin") {

      return response.status(404).json({
        message: 'Unauthorized to access this route, admin only'
      })
    }

    await next()
  }
}

module.exports = AdminMiddleware
