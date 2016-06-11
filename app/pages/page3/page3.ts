import {Page, Alert, NavController, NavParams} from 'ionic-angular';
// import {Component} from 'angular2/core';
import {DataService} from '../../providers/data/data';
import {DayModel} from '../../models/day-model';

@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  time: Date;
  date: string;

  appliances: any = require('../../appliances.json');
  totalConsumedToday: number;

  today: DayModel;

  myDay: DayModel; //TODO: remove
  mySave() {};
  myChangeDate() {};

  constructor(public nav: NavController, public dataService: DataService, public navParams: NavParams) {


    //Set up date display
    this.time = new Date();
    setInterval(() => this.time = new Date(), 1000);
    this.date = this.time.toDateString();

    this.dataService.localGetItem('today').then((value) => {
      this.today = value;
      this.totalConsumedToday = this.today.totalConsumedThisDay;
    });

    //model test TODO: remove
    this.myDay = this.navParams.get('day');
    this.mySave = this.navParams.get('save');
    this.myChangeDate = this.navParams.get('change');

  }
  // applianceTapped(event, appliance) {
  //   let prompt = Alert.create({
  //     title: appliance.title + ' usage',
  //     message: 'Enter the time you used the appliance for',
  //     inputs: [
  //       {
  //         name: 'time',
  //         placeholder: 'Time (hrs)',
  //         type: 'number'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Save clicked. Value (hrs x W) = ' + (data.time*appliance.wattsPerHour) );
  //           this.saveApplianceW( data.time * appliance.wattsPerHour );
  //         }
  //       }
  //     ]
  //   });
  //   this.nav.present(prompt);
  // }

  // increaseAppliance(event, appliance) {
  //   this.totalConsumedToday += (appliance.wattsPerHour * 1);
  //   this.dataService.localSetItem('totalConsumedToday', this.totalConsumedToday).then(() => {
  //     return;
  //   });
  // }

  increaseAppliance(event, appliance) {
    var applianceChange: number = appliance.wattsPerHour * 1;

    this.today.appliancesConsumption[appliance.id][1] += 1;
    this.today.appliancesConsumption[appliance.id][2] += applianceChange;

    this.today.totalConsumedThisDay += applianceChange;
    this.totalConsumedToday = this.today.totalConsumedThisDay;
    this.dataService.localSetItem('today', this.today).then(() => {
      return;
    });

  }

  decreaseAppliance(event, appliance) {
    this.totalConsumedToday -= (appliance.wattsPerHour * 1);
    this.dataService.localSetItem('totalConsumedToday', this.totalConsumedToday).then(() => {
      return;
    });
  }

  clearConsumption() {
    this.totalConsumedToday = 0;
    this.dataService.localSetItem('totalConsumedToday', this.totalConsumedToday);
  }
}
