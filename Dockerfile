#FROM node:4

FROM gcr.io/google_appengine/nodejs

# Install npm 2.15.5

# Create app directory
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install

# Bundle app source
# COPY . /usr/src/app



# Bundle app source


COPY /Server /Server
#COPY /Server/.env /Server
# ADD /Server

# Install app dependencies
RUN cd /Server; npm install
#RUN npm install

EXPOSE 3000
#CMD [ "npm", "start" ]
CMD ["node", "/Server/bin/www"]
