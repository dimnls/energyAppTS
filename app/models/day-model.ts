export class DayModel {
  appliances: any = require('../appliances.json');

  date: string;
  totalConsumedThisDay: number;
  appliancesConsumption = [];

  status: number = 9999;

  constructor(date: string) {
    this.date = date;
    this.totalConsumedThisDay = 0;

    //Initialize appliancesConsumption matrix with appliances names and zeroes for consumption
    for( let row = 0; row < this.appliances.length; row++) {
      let rowAppliance = [];
      rowAppliance[0] = this.appliances[row].title;
      for( let col = 1; col < 3; col++) {
        rowAppliance[col] = 0;
      }
      this.appliancesConsumption[row] = rowAppliance;
    }

  }

}
