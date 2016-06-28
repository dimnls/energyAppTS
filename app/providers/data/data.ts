import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {SQLite} from 'ionic-native';


import 'rxjs/add/operator/map';

// import localForage = require('localforage');
var localForage = require('localforage');
//var cordovaSQLiteDriver = require('localforage-cordovasqlitedriver');
/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  data: any = null;
  sql: Storage;

  constructor() {
    this.sql = new Storage(SqlStorage, {name: 'AmberStorage'});
    //this.localForageSetDriver();



  }

  localSetItem(key: string, value: any) {
    //return this.sql.set(key, value);
    return localForage.setItem(key, value);
  }

  localGetItem(key: string) {
    //return this.sql.get(key);
    return localForage.getItem(key);
  }

  sqlGet(key: string) {
    return this.sql.get(key);
  }
  sqlSave(key: string, value: any) {
    this.sql.set(key, value);
  }

  // localForageSetDriver() {
  //   localForage.defineDriver(window.cordovaSQLiteDriver).then(() => {
  //     return localForage.setDriver([
  //       window.cordovaSQLiteDriver._driver,
  //       localForage.INDEXEDDB,
  //       localForage.WEBSQL,
  //       localForage.LOCALSTORAGE
  //     ]);
  //   }).then(() => {
  //     console.log(localForage.driver());
  //   });
  // }

}
