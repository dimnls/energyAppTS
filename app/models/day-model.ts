import {Injectable} from '@angular/core';

@Injectable()
export class DayModel {
  appliances: any = require('../appliances.json');
  statuses: any = require('../statuses.json');

  time: Date;
  date: string;

  averageConsumption: number = 8.76;

  totalConsumedThisDay: number;
  appliancesConsumption = [];
  statusId: number;
  currentStatus: any;

  constructor() {

    this.time = new Date();
    this.date = this.time.toDateString();

    this.totalConsumedThisDay = 0;
    this.refreshStatus();

    //Initialize appliancesConsumption matrix with appliances names and zeroes for consumptions
    for( let row = 0; row < this.appliances.length; row++) {
      let rowAppliance = [];
      rowAppliance[0] = this.appliances[row].title;
      for( let col = 1; col < 3; col++) {
        rowAppliance[col] = 0;
      }
      this.appliancesConsumption[row] = rowAppliance;
    }

    console.log('NEW DAY MODEL CREATED');
    console.log(this);
  }

  refreshStatus() {
    let consumption = this.totalConsumedThisDay;

    if(consumption == null || consumption == 0) {
      this.statusId = 0;
    } else if(consumption >= (this.averageConsumption + 3)) {
      this.statusId = 1;
    } else if(consumption > (this.averageConsumption)) {
      this.statusId = 2;
    } else if(consumption <= (this.averageConsumption - 3)) {
      this.statusId = 4;
    } else if (consumption <= (this.averageConsumption)) {
      this.statusId = 3;
    }
    this.currentStatus = this.statuses[this.statusId];
  }

}
