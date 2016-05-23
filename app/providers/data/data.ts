import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';

// import localForage = require('localforage');
var localForage = require('localforage');

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
    this.sql = new Storage(SqlStorage, {name: 'UserDetails'});

  }

  localSetItem(key: string, value: any) {
    return localForage.setItem(key, value);
  }

  localGetItem(key: string) {
    return localForage.getItem(key);
  }

  sqlGet(key: string) {
    return this.sql.get(key)
  }
  sqlSave(key: string, value: any) {
    this.sql.set(key, value);
  }

}
