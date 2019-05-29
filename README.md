# myskills-web

[![Build Status](https://travis-ci.com/JobtechSwe/myskills-web.svg?branch=master)](https://travis-ci.com/JobtechSwe/myskills-web)
[![Maintainability](https://api.codeclimate.com/v1/badges/e4539faffd7931524983/maintainability)](https://codeclimate.com/github/JobtechSwe/myskills-web/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e4539faffd7931524983/test_coverage)](https://codeclimate.com/github/JobtechSwe/myskills-web/test_coverage)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A web-interface for [myskills-api](https://github.com/JobtechSwe/myskills-api)

## Getting started

```
nvm use
npm install
npm start
```

## Tech

### GraphQL

Apollo GraphQL is used both for server-queries and for local (global) state-management.

In the register-process (`views/CreateProfile`) all data is saved via [`apollo-client`](https://www.apollographql.com/docs/react/why-apollo#combine-data) in local storage until a CV is saved. When a CV is saved, the views that are provided are located in `views/Profile` and all mutations and queries are then made towards the API which handles data from Egendata. To re-use the main-logic of the components we've decided to put these in `views/partials`.

## Importing modules

The `baseUrl`-flag is enabled and pointed to `src/` in `tsconfig.json` to enable us to import
modules and components via `import X from 'components/X` which resolves to `import X from './src/components/X'`. This is to prevent getting stuck by long repetitions of `../../../` and is also helpful
when moving files around.

You can read more about it here: [https://www.typescriptlang.org/docs/handbook/module-resolution.html](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

## Scripts

| Command       | Description |
| ------------- | ----------- |
| lint          |             |
| generate      |             |
| cypress       |             |
| cypress-ci    |             |
| cypress:gui   |             |
| cypress:run   |             |
| buildAndServe |             |
