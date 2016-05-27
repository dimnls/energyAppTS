import {Page} from 'ionic-angular';
// import {Component} from 'angular2/core';
import {EnergyItemsPage} from '../energy-items/energy-items';


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {
  energyItemsPage: any;
  time: Date;
  date: String;
  constructor() {
    this.energyItemsPage = EnergyItemsPage;

    //Set up date display
    this.time = new Date();
    setInterval(() => this.time = new Date(), 1000);
    this.date = this.time.toDateString();
  }
}
