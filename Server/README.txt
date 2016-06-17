Node-based backend is split into 2 subprojects, api_app as restful APIs for mobile access, 
and server_app for Web components access, respectively.


I. Toolsets (on Windows):

- NoSQL Server: MongoDB 3.2.6
- Data Explorer: Mongo Management Studio 1.9.4
- Node.js runtime and Node Package Manger (npm) 
- IDE: Jetbrain Webstorm 2016.1.3
- Endpoint APIs Explorer: Postman

II. MongoDB:

- Install
- Add its path to bin directory to system environmment variables

- Create database directory (for instance, c:\data\db)

- Start mongo server:
$ mongod --storageEngine=mmapv1
$ use net10   # database name for this app, switch to this database if it already exists, otherwise, create a new one

- Prime users table/collections with some starter data:

username/password: admin/1

$ db.users.insert(
   [
     { _id: "3a6d423d-0fa5-4150-a99d-a921496be7ef", username: "admin", hashedPassword: "53d445b05949589489b8481c2d22d5a677a1abf869e76c17d4f39824fb5aa48b88fd95d25e1b9aeadafc32dce86b459626ea59f6165e725a2140eb348ffc3148", "salt" : "012c6de2a17fc0c8bbc79b01fe4f807d", email: "admin@markduvall.com", firstName: "Mark Admin", lastName: "Duvall Admin", "authorities":["ROLE_ADMIN","ROLE_MANAGER","ROLE_RECRUITER","ROLE_USER"],"__v" : 0 }
   ]
)


- View data:
$ db["users"].find()
$ exit # quit database



III. Project Source Code:

- Check out code from remote Github repo, open project with Webstorm

- Change db and api version settings in Server/app.js

- Under app root dir, create .env file, fill in environment vars as follows:
    API_VERSION=/v1
    DB_CONNECTION_URI=mongodb://localhost/net10
    JWT_SECRET=01ten_secret

Run the api app on server:

- Move the command prompt to Server dir.

Install node-based dependencies:
$ npm install 

Start node server:
$ npm start


Use Postman for exploring Endpoint APIs, some samples as follows:

Uri                                                 Method          Json-formatted Body                          Request Header                   Returned Payload         Description          
 
http://localhost:3000/api/v1/accounts/login         Post            {"username": "","password": ""}                                               a token string           Authenticate a User/Account

http://localhost:3000/api/v1/accounts               Post            {"username": "","password": "",             Authorization: Bearer [token]     success/failure          Create a new user/account                                
																	 "email": "", "firstName": "",
																	 "lastName":"", "authorities":""}
