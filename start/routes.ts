/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import { Query } from 'mongoose';




Route.get('/', async () => {
  return { hello: 'world' }
})


  // login route for both Admin and user
  Route.post('/auth/login', 'AuthController.login')

  //  register [user,admin]
  Route.post("/auth/register", "AuthController.register");

  // route to view user [user,admin]
  Route.get("/user", "AuthController.viewUser").middleware("verifyToken");

  // route accessible to only admin
  Route.get("/view-user/:id", "AuthController.adminViewUser").middleware(["verifyToken", "AdminMiddleware"]);
  


