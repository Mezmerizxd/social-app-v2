# Social App V2

#### Video Demo: [YouTube Video](https://youtu.be/jbLXTxT0sYk)

#### Description: This is a simple messaging application that allows you to chat with your friends. Features: Add Friend, Friend Requests, Edit Profile and a lot more. The stack, TypeScript/Express/React/Docker.

# Screenshots

![](./screenshots/example_1.png)
![](./screenshots/example_2.png)
![](./screenshots/example_3.png)
![](./screenshots/example_4.png)
![](./screenshots/example_5.png)
![](./screenshots/example_6.png)
![](./screenshots/example_7.png)
![](./screenshots/example_8.png)

# Environment Variables

You can find an example of the environment variables inside `'.example.env'`, please copy everything from inside that file into a new file called `'.env'` and configure it to your liking (if you change the ports then you will need to configure the docker files too).

# Commands

## Basic commands

-   `yarn build` Builds both server & client inside of the 'release/' directory
-   `yarn start` Starts the server in production mode
-   `yarn dev` Starts the server in development mode, this is the main command to use when developing on this

## More commands

-   `yarn sv_build` Builds the server
-   `yarn cl_build` Builds the client
-   `yarn sv_dev` Starts server in development mode, if theres a build of the client then it will use that in production mode
-   `yarn cl_dev` Starts the client in development mode, only really useful if you're only to work on the styles

## Docker commands

-   `yarn docker_build` Creates an image of the server and nginx
-   `yarn deploy` Uses the images that were built and deploys it to a container using nginx to host the server

## Formatting and Checking

-   `yarn format` Uses prettier to format the server & client code
-   `yarn lint:fix` Uses eslint and goes through the server & client code

# Configurations

## Server

-   The Typescript configuration file for the server is called `tsconfig.server.json`.

## Client

-   The Typescript configuration file for the server is called `tsconfig.json` and there is also a custom configuration file for react/react-scripts and they can be found inside `config-overrides.js`.

## Docker

-   The main Docker file can be found at `express-boilerplate/Dockerfile` and this is for the `express-boilerplate-server` image.
-   The Docker file for nginx can be found at `express-boilerplate/nginx/Dockerfile` and will create a image for `express-boilerplate-nginx` so it can manually host the server.
-   The Docker compose file can be found at `express-boilerplate/docker-compose.yml` and this is for locally hosting the server using Docker and also uses the built Docker images listed above.
