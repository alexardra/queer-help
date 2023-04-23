# volunteering app mvp

## Installation

You will need to have node and npm installed to run the project:

### Backend
```shell
$ cd server
```

Create `.env` file and set values: (You will need a running mongodb instance)
```node
MONGODB_URI=
PORT=3000
SOCKET_PORT=5000
JWT_SECRET='secret'
JWT_ALGO='HS256'
JWT_LIFETIME='2 days'
SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:8080
```
After setting up `.env`, run:

```shell
$ npm install

$ npm run dev
```

### Frontend

```shell
$ cd client
```

Create `.env` file and set values (referencing server url and port set inside server `.env` file):
```node
VITE_API_URL=http://localhost:3000/api/
VITE_SOCKET_URL=http://localhost:3000
```

After setting up `.env`, run:
```shell
$ npm install

$ npm run dev
```

If you would like to build the project:
```shell
$ cd server

$ npm run build

$ npm run start
```
```shell
$ cd client

$ npm run build
```
