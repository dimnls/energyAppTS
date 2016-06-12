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

  //myDay: DayModel;

  constructor(public nav: NavController, public dataService: DataService, public navParams: NavParams, public myDay: DayModel) {
    this.myDay = myDay;

  }

  // increaseAppliance(event, appliance) {
  //   var applianceChange: number = appliance.wattsPerHour * 1;
  //
  //   this.today.appliancesConsumption[appliance.id][1] += 1;
  //   this.today.appliancesConsumption[appliance.id][2] += applianceChange;
  //
  //   this.today.totalConsumedThisDay += applianceChange;
  //   this.totalConsumedToday = this.today.totalConsumedThisDay;
  //   this.dataService.localSetItem('today', this.today).then(() => {
  //     return;
  //   });
  //
  // }

  increaseAppliance(event, appliance) {
    var applianceChange: number = appliance.wattsPerHour * 1;

    this.myDay.appliancesConsumption[appliance.id][1] += 1;
    this.myDay.appliancesConsumption[appliance.id][2] += applianceChange;

    this.myDay.totalConsumedThisDay += applianceChange;
    //this.totalConsumedToday = this.myDay.totalConsumedThisDay;
    this.dataService.localSetItem('CURRENT_DAY', this.myDay).then(() => {
      return;
    });

  }

  decreaseAppliance(event, appliance) {
    var applianceChange: number = appliance.wattsPerHour * 1;

    this.myDay.appliancesConsumption[appliance.id][1] -= 1;
    this.myDay.appliancesConsumption[appliance.id][2] -= applianceChange;

    this.myDay.totalConsumedThisDay -= applianceChange;
    //this.totalConsumedToday = this.myDay.totalConsumedThisDay;
    this.dataService.localSetItem('CURRENT_DAY', this.myDay).then(() => {
      return;
    });

  }

  clearConsumption() {
    this.totalConsumedToday = 0;
    this.dataService.localSetItem('totalConsumedToday', this.totalConsumedToday);
  }
}
