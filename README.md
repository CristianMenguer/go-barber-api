<h1 align="center">
<br>
  <img src="src/assets/images/logo-interna.svg" alt="Go-Barber" width="90">
<br>
<br>
GoBarber
</h1>

<p align="center">An app for barber appointment and scheduling.</p>

<hr />

## Features

A Node.js API built with Express and all the latest tools and best practices in development!

- ⚡ **Express** — A web framework for Node
- 💾 **TypeORM** — ORM for Node.js
- 💖 **Lint** — ESlint/Prettier/Editor Config

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Docker](https://www.docker.com/)

## Prerequisites

_In progress..._

## Getting started

1. Clone this repo using `git clone https://github.com/cristianmenguer/go-barber-api.git`
2. Move to the appropriate directory: `cd go-barber-api`.<br />
3. Run `yarn install` to install dependencies.<br />
4. Run `docker run --name go-barber-postgres -e POSTGRES_PASSWORD=go-barber -p 5432:5432 -d postgres`
5. Create database `go-barber`
6. Run `yarn typeorm migration:run`
7. Run `yarn dev:server` to run the servers at `http://localhost:3333`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
