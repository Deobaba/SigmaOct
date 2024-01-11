import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {
    //  login for both user and Admin function
    public async login({ auth, request, response }: HttpContextContract) {
      // the request body is validated and passed to the payload
        const payload = await request.validate({
            schema: schema.create({
              email: schema.string([rules.email()]),
              password: schema.string(),
            }),
            // for validation error
            reporter: validator.reporters.vanilla,
          });
      
          // token is set up
        try {
            const token = await auth.use('api').attempt(payload.email, payload.password, {
                expiresIn: '30days',
            })
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
        const payload = await request.validate(RegisterValidator);
        try {
          await User.create(payload);
          return response.status(200).json({
            message: "Account created successfully",
          });
        } catch (error) {
          return response.status(500).json({ message: "Something went wrong!" });
        }
    }

    // function to view user , accessible to user and admin
   
    public async viewUser({ response, auth }: HttpContextContract) {
        const user = auth.use("api").user;
        return response.json({ status: 200, user });
    }
    // function to view user by admin
    public async adminViewUser ({response,params: { id } }: HttpContextContract) {
        const user = await User.find(id)
        return response.json({ status: 200, user });
    }

      //   * Logout user
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").logout();
    return response.json({ message: "Logged out successfully!" });
  }
}
