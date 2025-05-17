## Title

### Social Network

## Description

A RESTful API for a social networking platform developed using NestJS, TypeORM, and PostgreSQL. This backend provides core social features such as user registration and login, creating, editing, and deleting posts, liking and commenting on posts, and user profile management.

It also includes:

* JWT-based authentication (JwtService)

* Secure sessions via HTTP-only cookies

* Password hashing with bcrypt

* Data validation using class-validator

* Structured with modules, services, and DTOs for maintainability and scalability

## Project setup

```bash
$ npm install

# Build the project
$ npm run build

#  Run database migrations
$ npm run migration:generate

# Initialize tables
$ npm run migration:run

# Activate seeders
$ npm run seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
