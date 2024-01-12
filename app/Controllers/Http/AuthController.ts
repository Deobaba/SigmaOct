import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import Env from '@ioc:Adonis/Core/Env'
import RegisterValidator from "App/Validators/RegisterValidator";
import jwt from 'jsonwebtoken'
import Hash from '@ioc:Adonis/Core/Hash'


export default class AuthController {
    // function to get all users, accessible to admin and user
    //  login for both user and Admin function
    public async login({ request, response }: HttpContextContract) {
      // the email and password is validated and passed to the payload
        const payload = await request.validate({
            schema: schema.create({
              email: schema.string([rules.email()]),
              password: schema.string(),
            }),
            // for validation error
            reporter: validator.reporters.vanilla,
          });
      console.log(payload)

      // check if user exist

      let user = await User.findBy('email', payload.email)
    
      if (!user) {
        return response.status(404).json({
          status: "error",
          message: "User not found",
          success: false,
        });
      }
      // check if password is valid
      const isPasswordValid = await Hash.verify(user.$attributes.password,payload.password);

      if (!isPasswordValid) {
        return response.status(401).json({
          status: "error",
          message: "Invalid password",
          success: false,
        });
      }
  
          // token is set up
        try {
            // const token = await auth.use('api').attempt(payload.email, payload.password, {
            //     expiresIn: '30days',
            // })
           const  secretKey : string = Env.get("secretKey")
            // Generate a jwt token
            const token = jwt.sign({email:payload.email}, secretKey, { expiresIn: '30d' });

            return response.json({
                status: 200,
                message: "Logged in successfully!",
                token: token,
              });
            
            } catch (error) {
              return response.unauthorized("Invalid credentials");
        }
    }
    // register function
    public async register({ request, response }: HttpContextContract) {
      
      // validate the passed in credentials
        const payload = await request.validate(RegisterValidator);

        try {
          // create the user
          await User.create(payload);
          return response.status(200).json({
            message: "Account created successfully",
          });
        } catch (error) {
          return response.status(500).json({ message: "Something went wrong!" });
        }
    }



    // function to view user , accessible to user and admin
    public async viewUser({request , response}: HttpContextContract) {
      try{
        // the user is passed to the request already from the middleware to reduce numbers of time it makes request
        const userDetails = request.user.$attributes
      
        return response.status(200).json({message :"successful", user:userDetails});

      }
      catch(err){
        response.status(500).json({
          status: "error",
          message: "Internal server error",
          success: false,
        });
      }
       
    }
    // function to view user by admin
    public async adminViewUser ({request,response}: HttpContextContract) {
      try{
      //   the user is passed to the request already 
        const userDetails = request.passedUser.$attributes

      // console.log(userDetails,"detailss")

        return response.status(200).json({message:"succesfful", userDetails});

      }catch(err){
        return response.status(500).json({
          status: "error",
          message: "Internal server error",
          success: false,
        });
      }
      
    }

      
}
