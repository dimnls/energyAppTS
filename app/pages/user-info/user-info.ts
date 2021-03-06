import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {DataService} from '../../providers/data/data';
var localForage = require('localforage');
import {FormBuilder, Validators, NgForm} from '@angular/common';

import { FORM_PROVIDERS } from '@angular/common';


/*
  Generated class for the UserInfoPage page.
  
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/user-info/user-info.html',
})
export class UserInfoPage {
  username: string;
  age: number;
  peopleinhouse: string;

  userInfoForm: any;

  constructor(public nav: NavController, public dataService: DataService, public navParams: NavParams, form: FormBuilder) {
    this.nav = nav;
    this.dataService = dataService;
    this.navParams = navParams;

    this.userInfoForm = form.group({
      username: ["", Validators.required],
      age: ["", Validators.required],
      peopleinhouse: ["", Validators.required]
    });

    this.getAllUserInfo();
  }

  submitUserInfo(event) {
    console.log(this.userInfoForm.value);
    event.preventDefault();
    console.log(this.userInfoForm.value.username);
  }

  saveUserInfo(username, age, peopleinhouse) {
    if(username == '' || age == '' || peopleinhouse == '') {
      console.log('Empty fields!');
      this.fieldsAlert();
    } else {
      this.dataService.localSetItem('name', username);
      this.dataService.localSetItem('age', age);
      this.dataService.localSetItem('PeopleInHouse', peopleinhouse);

      this.dataService.sqlSave('sqlName', username);
      this.dataService.sqlSave('sqlAge', age);
      this.dataService.sqlSave('sqlPeople', peopleinhouse);

      this.navParams.get('appPage').username = username;
      this.nav.pop(); //POP save page and return to home
    }

  }

  getUserInfo(key) {
    return this.dataService.localGetItem(key);
  }

  getAllUserInfo() {
    this.getUserInfo('name').then((value) => {
      console.log(value);
      this.username = value;
    });
    this.getUserInfo('age').then((value) => {
      console.log(value);
      this.age = value;
    });
    this.getUserInfo('PeopleInHouse').then((value) => {
      console.log(value);
      this.peopleinhouse = value;
    });
  }

  fieldsAlert() {
    let alert: Alert = Alert.create({
      title: 'Cannot leave empty fields!',
      subTitle: 'Please enter your details.',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

}
