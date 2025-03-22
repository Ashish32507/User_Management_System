# Project Name - User Management System

 Steps To Run This Project
  1. node js is required in your system
  2. download npm i express mongoose dotenv bcrypt jsonwebtoken
  3. run this project using nodemon index.js or node index.js

  4. in this project i have implemented this
      User Registration
               Endpoint: /api/register
               Fields: name, email, password
     User Login
               Endpoint: POST /api/login
               Fields: email, password
               Return a JWT token on successful login.
    Get User Profile (Authenticated Route)
               Endpoint: GET /api/profile
               Requires JWT authentication.
               Return user details (except password).
   Update User Profile (Authenticated Route)
               Endpoint: PUT /api/profile
               Allows updating name and email.
               Ensure email uniqueness.
   Delete User (Authenticated Route)
               Endpoint: DELETE /api/profile
               Deletes the user from the database.
