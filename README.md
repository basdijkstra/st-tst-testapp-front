# StTstTestappFront
## Install
The [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) command uses the .nvmrc file to set correct node version
```shell
nvm install # install correct Node version
```

## Run local test with mock
The frontend test are Playwright test and are specified in typescript in the tests folder.
Installation for all packages.
Instalation for [Playwright](https://playwright.dev/docs/intro#installing-playwright) with depency for installing the browsers.
Installation for specific installation for the mockserver [Prism](https://github.com/stoplightio/prism).

```shell 
npm install
npm install -g @stoplight/prism-cli
npx playwright install --with-deps
npm run startMockserverAndApp
``` 

## End to End Test

The E2E test are Playwright test and are specified in typescript in the tests folder. 
Run `npm run e2etest` to run against the test environment.@smoketest.

```shell
export PW_BASE_URL=https://st-devops-testfullapp-dev.azurewebsites.net
npm run e2etest 
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
