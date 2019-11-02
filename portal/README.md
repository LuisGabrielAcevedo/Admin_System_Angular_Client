# Portalsanrio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Use the `npm run build:prod` for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

## Generating documentation

Run `npm run docs` to execute the documentation via [Compodoc](https://compodoc.app/)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## NEXUS Configuration

1.Remove old referencies to NPM

```
npm config delete registry
```

2.Point NPM registry to Nexus

```
npm config set registry=http://artifacts.intranet/repository/npm-group/
```

3.Check if the config was successfully changed

```
npm config list
```
