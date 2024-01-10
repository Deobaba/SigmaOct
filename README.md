
# SigmaOct 

REST API using AdonisJs, focusing on the following features:
User can register 
User can login 
User can view profile 
Admin can register 
Admin can login 
Admin can view Users 
Please note that the implementation should incorporate JWT (JSON Web Tokens) for authentication.



## Install Dependencies

Install

```bash
  npm install 
  
```
    
## Run App

node ace serve
## Endpoints 

#Register

POST 

https://sigmaoct-restapi.onrender.com/auth/register

this endpoint regiters user [user, admin], the default usertype is [user].

example

{
    "username":"deobaba",
    "email":"abcde@gmail.com",
    "user_type":"user"
    "password":"1234567",
    "password_confirmation":"1234567"
}


#Login 

POST

https://sigmaoct-restapi.onrender.com/auth/Login

this endpoint is used for logging in , can be used by admin and user

example

{
    "email":"abcde@gmail.com",
    "password":"1234567"
}


#View User
Method - GET

https://sigmaoct-restapi.onrender.com/user

this endpoint is use to get a specific user (user or admin) with thier token 

example

Authorization 
Bearer Token <token>

#Admin View User
method - GET 
https://sigmaoct-restapi.onrender.com/view-user/1

only admin is authorized to access this endpoint and the user id is passes as params 

example

Authorization 
Bearer Token <token>





## Documentation

Extensive [Documentation](https://documenter.getpostman.com/view/27540447/2s9YsKhCrr#0c658f0c-a33b-4a54-b37c-7cdaf78e8958)


