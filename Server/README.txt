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
     { _id: "3a6d423d-0fa5-4150-a99d-a921496be7ef", username: "admin", hashedPassword: "53d445b05949589489b8481c2d22d5a677a1abf869e76c17d4f39824fb5aa48b88fd95d25e1b9aeadafc32dce86b459626ea59f6165e725a2140eb348ffc3148", "salt" : "012c6de2a17fc0c8bbc79b01fe4f807d", email: "admin@markduvall.com", firstName: "Mark Admin", lastName: "Duvall Admin", cell: "123456", "authorities":["ROLE_ADMIN","ROLE_MANAGER","ROLE_RECRUITER"],"__v" : 0 }
   ]
)


- View data:
$ db["users"].find()
$ exit # quit database



III. Project Source Code:

- Check out code from remote Github repo, open project with Webstorm

- Enter global settings for your targeted environment in Server/config.json
  Set DEPLOYMENT_MODE to your deployment mode (supported modes includes DEV,PROD)

- Under app root dir, create .env file, fill in environment vars specific to dev/test/prod environments as the example that follows:
    PROD_DB_SERVER_PASSWORD=pwd
    JWT_SECRET=secret
    MAIL_PASSWORD=123
	
- Switch the loading of env file in app.js by uncommenting code lines:

For Dev Environment:
// require('dotenv').load();

For Production Environment:
// Prod env
// var dotEnv = require('dotenv');
// dotEnv.config({path: '/Server/.env'});

Run the api app on server:

- Move the command prompt to Server dir.

Install node-based dependencies:
$ npm install 

Start node server:
$ npm start


Use Postman for exploring Endpoint APIs, some samples as follows:

Uri                                                 Method          Json-formatted Body                          Request Header                   Returned Payload         Description          
 
http://localhost:8080/api/v1/accounts/login         Post            {"username": "","password": ""}                                               a token string           Authenticate a User/Account
                                                                     "cell": "", "workPhone": "",
                                                                     "homePhone": "", "address": "",
																	 "email": "", "firstName": "",
																	 "lastName":"", "authorities":""}

																	 
VI. Deploy app on GCP:
1. Deployment:

- Install Docker, KubeCtl

- Open app.js, comment/uncomment code lines to turn on/off prod/dev envs

Create and tag a docker image from Dockerfile:
- Point the cursor to project root dir where Dockerfile resides
- //$ sudo docker build -t net10-backend-image-v1 .

$ sudo docker build -t gcr.io/algebraic-hub-132823/net10-backend-image:v1 .
$ sudo docker images

Put newly created docker image onto Google Container Registry:
$ sudo gcloud docker push gcr.io/algebraic-hub-132823/net10-backend-image:v1


Create a cluster:
$ sudo gcloud container clusters create net10-v1-cluster-1 --num-nodes 1 --machine-type g1-small
- Create a pod on the cluster:
$ sudo kubectl run net10-backend-image-v1 --image=gcr.io/algebraic-hub-132823/net10-backend-image-v1 --port=8080


   - List Pods and Node Names:
      $ sudo kubectl get pods -o wide
   - Log into a Node:
      $ sudo gcloud compute ssh {node}
   - List running Docker containers:
      $ sudo docker ps
   - Test a Docker container on Node:
      $ sudo docker run {container_id}
	  
	kubectl get services

	

Externalize kube service to Internet:
$ sudo kubectl expose deployment net10-backend-image-v1 --type="LoadBalancer"

Get external IP:
$ sudo kubectl get services


Roll out an update:
$ sudo kubectl edit deployment net10-backend-image-v1
Edit, save and close config file:

containers:
      - image: gcr.io/PROJECT_ID/image_name:{version} # Update this line

$ sudo kubectl get deployments



2. Automatated Redeployment:

- Move cursor to parent directory of Server folder, where gke-deploy.sh and Dockerfile reside
- ./gke-deploy.sh {version}
- When prompted, enter github credentials
- Edit, save and close config file:

containers:
      - image: gcr.io/PROJECT_ID/image_name:{version} # Update this line
	  
- App redeployed in some seconds
										 