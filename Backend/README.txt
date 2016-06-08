
TEN app is broken down into microservices in form of subprojects. They autonomously work in isolation as well as collaborate when needed.

I. Toolsets (on Windows):

- NoSQL Server: MongoDB 3.2.6
- Data Explorer: Mongo Management Studio 1.9.4
- JDK 1.8.0_92
- IDE: Spring Tool Suite 3.7.3
- Gradle 2.13
- Gradle STS Plugin (Open STS | Help | Dashboard | IDE Extensions | Search For Gradle | Install | Next | Finish)

- Endpoint APIs Explorer: Postman

II. MongoDB:

- Install
- Add its path to bin directory to system environmment variables

- Create database directory (for instance, c:\data\db)

- Start mongo server:
$ mongod --storageEngine=mmapv1
$ use net10   # database name for this app, switch to this database if it already exists, otherwise, create a new one

- Prime users table/collections with some starter data:

$ db.users.insert(
   [
     { _id: "markduvall", _class: "com.ten.net10.account.entity.User", username: "markduvall", password: "$2a$10$7hhHKsHZj6zvzD1QZEbmRe1TWMYV0ZzOBFuY1rCrR5urA/9h/eG0a", email: "mark@markduvall.com", firstName: "Mark", lastName: "Duvall", authorities: "ROLE_ADMIN,ROLE_MANAGER,ROLE_RECRUITER"},
     { _id: "dungho", _class: "com.ten.net10.account.entity.User", username: "dungho", password: "$2a$10$7hhHKsHZj6zvzD1QZEbmRe1TWMYV0ZzOBFuY1rCrR5urA/9h/eG0a", email: "dung.hoviet@imipgroup.com", firstName: "Dung", lastName: "Ho", authorities:[{},{},{}] "ROLE_ADMIN,ROLE_MANAGER,ROLE_RECRUITER"}
   ]
)

# password for 2 users is 1

- View data:
$ db["users"].find()
$ exit # quit database


III. Build and Run Microservices:

 Build and run each microservices in isolation:

- Check out codebase from Bitbucket
- Import subprojects into IDE (Open STS Package Explorer | Right-click | Import | Gradle (STS) Project | Next | Browse to subproject root dir |  Build Model | Finish)
- Move to a microservices subproject 's root directory:

$ gradle clean build

- Run microservices with the help of Spring Boot:
$ java -Dspring.data.mongodb.uri=mongodb://localhost:27017/net10 -jar build/libs/com-ten-net10-account-micros-0.1.0.jar

- Open Postman to explore Endpoint APIs exposed by microservices

- Authenticate first, then do CRUD operations, for instance:

http://localhost:8080/login (http method: POST)
http://localhost:8080/net10/v1/accounts (with JSON-formatted body data specified)


IV. Deploy Microservices onto Cloud: N/A