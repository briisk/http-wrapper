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

# Documentation

[TypeDoc Documentation](https://briisk.github.io/http-wrapper/doc/classes/_http_wrapper_.httpwrapper.html)

# Development:

## Requirements:

* NodeJS version > 5.9.0

## How to install:
```
git clone --recursive https://github.com/briisk/http-wrapper
npm run copy-config
npm install
```

## Updating submodules:
```
git submodule update --init --recursive
```

## Run application in development mode:
```
npm run server
```

## Run linters:
```
npm run lint
```

## Run unit tests in watch mode:
```
npm run watch:test
```

## Run e2e tests
```
npm run e2e
```

## Production build:
```
npm run build:prod
```
