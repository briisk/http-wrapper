Workspace build status:

[![Build Status](https://semaphoreci.com/api/v1/briisk-co/http-wrapper/branches/master/badge.svg)](https://semaphoreci.com/briisk-co/http-wrapper)

Http Wrapper for Angular 2

# Usage:

```
    npm install --save @briisk/http-wrapper
```

```
    import { HttpWrapperModule } from '@briisk/http-wrapper';

    @NgModule({
        imports: [ HttpWrapperModule ],
        declarations: [ AppComponent ],
        bootstrap: [ AppComponent ]
    })
    export class AppModule {}
```

```
export class AppComponent {

  constructor(private httpWrapper: HttpWrapper) {
    this.httpWrapper.get('someUrl').subscribe((request) => {
        console.log(request);
    });

    this.httpWrapper.post('someUrl', {
        some: 'data'
    }).subscribe((request) => {
        console.log(request);
    });
  }
}
```

# HttpWrapper

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.21.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
