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
  appliancesToShow: any;
  searchQuery: string;

  constructor(public nav: NavController, public dataService: DataService, public navParams: NavParams, public myDay: DayModel) {
    this.searchQuery = '';
    this.myDay = myDay;
    this.initializeAppliancesToShow();

  }

  initializeAppliancesToShow() {
    this.appliancesToShow = this.appliances;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeAppliancesToShow();

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.appliancesToShow = this.appliancesToShow.filter((v) => {
      if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  increaseAppliance(event, appliance) {
    var applianceChange: number = appliance.kWh * 1;

    this.myDay.appliancesConsumption[appliance.id][1] += (appliance.time * 1);
    this.myDay.appliancesConsumption[appliance.id][2] += applianceChange;
    var round = Math.round(this.myDay.appliancesConsumption[appliance.id][2]*1000)/1000;
    this.myDay.appliancesConsumption[appliance.id][2] = round;

    this.myDay.totalConsumedThisDay += applianceChange;
    var roundTot = Math.round(this.myDay.totalConsumedThisDay*1000)/1000;
    this.myDay.totalConsumedThisDay = roundTot;

    this.myDay.refreshStatus();

    this.dataService.localSetItem('CURRENT_DAY', this.myDay).then(() => {
      return;
    });

  }

  decreaseAppliance(event, appliance) {
    var applianceChange: number = appliance.kWh * 1;

    if(this.myDay.appliancesConsumption[appliance.id][1] != 0) {
      this.myDay.appliancesConsumption[appliance.id][1] -= (appliance.time * 1);
      this.myDay.appliancesConsumption[appliance.id][2] -= applianceChange;
      var round = Math.round(this.myDay.appliancesConsumption[appliance.id][2]*1000)/1000;
      this.myDay.appliancesConsumption[appliance.id][2] = round;

      this.myDay.totalConsumedThisDay -= applianceChange;
      var roundTot = Math.round(this.myDay.totalConsumedThisDay*1000)/1000;
      this.myDay.totalConsumedThisDay = roundTot;

      this.myDay.refreshStatus();

      this.dataService.localSetItem('CURRENT_DAY', this.myDay).then(() => {
        return;
      });
    }

  }
}
