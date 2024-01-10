'use strict'
// const Customer = use('App/Models/Customer')

class AdminMiddleware {
  async handle({ response,auth}, next) {
    
    const user = auth.use("api").user;
    console.log(user.$attributes.userType)

    if (user.$attributes.userType !== "admin") {

      return response.status(404).json({
        message: 'Unauthorized to access this route, admin only'
      })
    }

    await next()
  }
}

module.exports = AdminMiddleware
