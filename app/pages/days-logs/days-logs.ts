import {Page, NavController, NavParams} from 'ionic-angular';
import {DayModel} from '../../models/day-model';
import {DataService} from '../../providers/data/data';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';



/*
  Generated class for the DaysLogsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/days-logs/days-logs.html',
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DaysLogsPage {

  days: DayModel[];
  loadedDays: DayModel[];

  //CHART
  public lineChartData: Array<any> = [{data: [100, 200, 180, 150], label: 'Series A'}];
  public lineChartLabels: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  constructor(public nav: NavController, public dataService: DataService) {
    this.days = [];

    this.dataService.localGetItem('DAYS_LOG').then((value) => {
      if( value != null ) { // DAYS_LOG exists
        this.loadedDays = value;
        this.loadedDays.reverse();
        for(let i = 0; i < this.loadedDays.length; i++) {
          this.days.push(this.loadedDays[i]);
          console.log(this.days);
        }
      } else {
        alert('Empty Log.');
        return;
      }
    });

      // this.lineChartData = [{data: [100, 200, 180, 150], label: 'Series A'}];
      // this.lineChartLabels = ['Mon', 'Tue', 'Wed', 'Thu'];
      // this.lineChartOptions = {
      //   animation: false,
      //   responsive: true
      // };
      // this.lineChartLegend = true;
      // this.lineChartType = 'line';



  }
}
