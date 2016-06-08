import {Page, Alert, NavController} from 'ionic-angular';
// import {Component} from 'angular2/core';
import {EnergyItemsPage} from '../energy-items/energy-items';
import {DataService} from '../../providers/data/data';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  energyItemsPage: any;
  time: Date;
  date: String;
  savedDate: String;

  appliances: any = require('../../appliances.json');
  totalConsumedToday: number;

  constructor(public nav: NavController, public dataService: DataService) {
    this.energyItemsPage = EnergyItemsPage;

    //Set up date display
    this.time = new Date();
    setInterval(() => this.time = new Date(), 1000);
    this.date = this.time.toDateString();

    this.dataService.localGetItem('totalConsumedToday').then((value) => {
      this.totalConsumedToday = value;
    });
  }

  applianceTapped(event, appliance) {
    let prompt = Alert.create({
      title: appliance.title + ' usage',
      message: 'Enter the time you used the appliance for',
      inputs: [
        {
          name: 'time',
          placeholder: 'Time (hrs)',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Save clicked. Value (hrs x W) = ' + (data.time*appliance.wattsPerHour) );
            this.saveApplianceW( data.time * appliance.wattsPerHour );
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

  saveApplianceW(watts: number) {
    this.totalConsumedToday += watts;
    this.dataService.localSetItem('totalConsumedToday', this.totalConsumedToday);
  }

  clearConsumption() {
    this.totalConsumedToday = 0;
    this.dataService.localSetItem('totalConsumedToday', this.totalConsumedToday);
  }
}
