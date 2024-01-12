'use strict'
import jwt from 'jsonwebtoken'
import User from "App/Models/User";
import Env from '@ioc:Adonis/Core/Env'



// verifies user token

class verifyToken {
    async handle({request ,response, params:{id}}, next) {

let token;
    // console.log(request.headers().authorization )
  
    if (
      request.headers().authorization &&
      request.headers().authorization.startsWith('Bearer')
    ) {
      // Set token from Bearer token in header
      // console.log("it got here")
      token = request.headers().authorization.split(' ')[1];

      // console.log("tokenn",token)
      
      // Set token from cookie
    }
    else if (request.cookies.token) {
      // console.log('cookies')
      token = request.cookies.token;
    }
    // console.log(token,'here')
    // Make sure token exists
    if (!token) {
      return response.status(401).json({
        success:false,
        message:"Not authorized to access this route!. Please try logging in again"
    })
    }
  
    try {
      // Verify token

      const  secretKey : string = Env.get("secretKey")
      
      const decoded = jwt.verify(token,secretKey);
  
      const getUser = await User.findBy('email', decoded.email)

      // return response.status(200).json({message:"user", getUser})
      request.user = getUser 

     
      if(!request.user) {
        return response.status(401).json({
            success:false,
            message:"Not authorized to access this route!. Please try logging in again"
        })
      }

      if(id){
        const getUser = await User.find(id)
        if(!getUser){
          return response.status(404).jsn({
            succes:false,
            message:`no user with this id ${id}`
          })
        }
        request.passedUser = getUser
      }
  
      next()
    } catch (err) {
        return response.status(401).json({
            success:false,
            message:"Not authorized to access this route!!!!. Please try logging in again"
        })
      }


    }
}

module.exports = verifyToken