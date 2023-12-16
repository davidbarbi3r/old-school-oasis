# Backend of retroasis made with Typescript, Nest.js, Prisma and Pgsql

Todos:

- [ ] Build the collection module (core module)
  - [ ] Basic CRUD
  - [ ] Add swagger doc
  - [ ] Add grant to allow users to share / edit / read collections
- [X] Make a service to get initial games data
- [X] Make a service to get initial platforms data
- [ ] Add connection to ebay api to evaluate some games (experimental feature)
- [ ] Add an OCR to get game data by taking a picture of it (experimental feature)
- [ ] Add discord OAuth
- [ ] Add steam OAuth

- [ ] Add tests to the api 


## Deploy

docker build -t oasis:0.1 .
docker tag oasis:0.1 ghcr.io/davidbarbi3r/oasis:latest
docker buildx build --platform linux/amd64 -t ghcr.io/davidbarbi3r/oasis:latest . --push

### on Remote ssh serv
docker compose down
docker image ls
