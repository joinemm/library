# Library app

##Features

- React frontend
- Nginx web server
- Rust Actix-web backend
- PostgreSQL database

## How to run it?

**Prerequisites:** You must have `docker` and `docker-compose` installed, and the docker daemon running. (https://docs.docker.com/compose/install/)

To start the application, simply type:
```
$ docker-compose up
```
to launch all three containers. It will take few minutes to compile everything the first time you run it (rust is notoriously slow to compile), but the runtime is very fast.

(you might have to run `docker-compose` as root or use `sudo`)

Then navigate your favourite browser to `localhost:3000`
