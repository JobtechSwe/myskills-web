# myskills-web

[![Build Status](https://travis-ci.com/JobtechSwe/myskills-web.svg?branch=master)](https://travis-ci.com/JobtechSwe/myskills-web)
[![Maintainability](https://api.codeclimate.com/v1/badges/e4539faffd7931524983/maintainability)](https://codeclimate.com/github/JobtechSwe/myskills-web/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e4539faffd7931524983/test_coverage)](https://codeclimate.com/github/JobtechSwe/myskills-web/test_coverage)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A web-interface for [myskills-api](https://github.com/JobtechSwe/myskills-api)

## Getting started

Create docker network.
```bash
docker create network myskills
```

Run the API, either you follow instructions at [myskills-api](https://github.com/JobtechSwe/myskills-api) or:
```bash
docker-compose up -d
````

Run the correct node-version using [nvm](https://github.com/nvm-sh/nvm)
```bash
nvm use
```

Install dependencies
```bash
npm i
```

Build:
```bash
npm run build
```

Start application:
```bash
npm start
```


## Running tests.
[Commands](https://github.com/JobtechSwe/myskills-web/blob/master/package.json#L38)

Unit:
```bash
npm run test
```

Integration:
```bash
## with ui
npm run cypress:gui
## in console
npm run cypress:run
```

## Importing modules

The `baseUrl`-flag is enabled and pointed to `src/` in `tsconfig.json` to enable us to import
modules and components via `import X from 'components/X` which resolves to `import X from './src/components/X'`. This is to prevent getting stuck by long repetitions of `../../../` and is also helpful
when moving files around.

You can read more about it here: [https://www.typescriptlang.org/docs/handbook/module-resolution.html](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
