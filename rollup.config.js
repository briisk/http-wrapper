export default {
    entry: './release/index.js',
    dest: './release/bundles/http-wrapper.umd.js',
    format: 'umd',
    moduleName: 'briisk.http-wraper',
    globals: {
      '@angular/core': 'ng.core',
      'rxjs/Observable': 'Rx',
      'rxjs/BehaviorSubject': 'Rx',
      'rxjs/Subscriber': 'Rx',
      'rxjs/scheduler/queue': 'Rx.Scheduler',
      'rxjs/operator/observeOn': 'Rx.Observable.prototype',
      'rxjs/operator/scan': 'Rx.Observable.prototype',
      'rxjs/operator/map': 'Rx.Observable.prototype',
      'rxjs/operator/catch': 'Rx.Observable.prototype',
      'rxjs/operator/throw': 'Rx.Observable.prototype',
      'rxjs/operator/withLatestFrom': 'Rx.Observable'
    }
  }
