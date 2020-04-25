FROM node:11.13.0-alpine
LABEL maintainer = "rlopezadana@gmail.com"

# create destination directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/app/
RUN npm install

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NODE_HOST=0.0.0.0
# set app port
ENV NODE_PORT=5000

# start the app
CMD [ "npm", "start" ]