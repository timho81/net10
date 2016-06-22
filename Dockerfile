FROM node:4

# Install npm 2.15.5

# Create app directory
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install

# Bundle app source
# COPY . /usr/src/app

# Install app dependencies
RUN cd /Server; npm install

# Bundle app source


COPY . /Server
# ADD . /Server

EXPOSE 3000
CMD [ "npm", "start" ]