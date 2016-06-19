import {Page, NavController, NavParams, Alert, Platform} from 'ionic-angular';
import {DayModel} from '../../models/day-model';
import {DataService} from '../../providers/data/data';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {Http} from '@angular/http';
import {Device} from 'ionic-native';



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
  appliances: any = require('../../appliances.json');
  totalAppliancesConsumption = [];
  totalConsumption: number;
  totalConsumptionTime: number;

  days: DayModel[];
  loadedDays: DayModel[];
  segments: string = 'list';

  //CHART
  // public lineChartData: Array<any> = [{data: [100, 200, 180, 150], label: 'Daily consumption'}];
  // public lineChartLabels: Array<any> = ['Mon', 'Tue', 'Wed', 'Thu'];

  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;

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
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'bar';

  dataToSend: any;
  uuid: string;
  response: string;
  submittedLogsOn: string;
  submittedLogs: boolean = false;

  constructor(public nav: NavController, public dataService: DataService, public http: Http, public platform: Platform) {
    this.days = [];
    this.http = http;
    this.dataToSend = {};

    this.platform.ready().then(() => {
      this.uuid = Device.device.uuid;
      this.dataService.localGetItem('submittedLogsOn').then((value) => {
        if(value) {
          this.submittedLogsOn = value;
          this.submittedLogs = true;
        }
      });
    });

    for( let row = 0; row < this.appliances.length; row++) {
      let rowAppliance = [];
      for( let col = 0; col < 2; col++) {
        rowAppliance[col] = 0;
      }
      this.totalAppliancesConsumption[row] = rowAppliance;
    }

    this.dataService.localGetItem('DAYS_LOG').then((value) => {
      if( value != null ) { // DAYS_LOG exists
        this.loadedDays = value;
        for(let i = 0; i < this.loadedDays.length; i++) {
          this.days.push(this.loadedDays[i]);

          for(let j = 0; j < this.appliances.length; j++) {
            this.totalAppliancesConsumption[j][0] += (this.loadedDays[i].appliancesConsumption[j][1] * 1); //increase total appliance time

            this.totalAppliancesConsumption[j][1] += (this.loadedDays[i].appliancesConsumption[j][2] * 1); //increase total appliance energy
          }
        }
        this.days.reverse();
        this.makeGraph();
      } else {
        alert('Empty Log.');
        return;
      }
    });
  }

  makeGraph() {
    var applianceEnergyTotals = [];
    var applianceNames = [];
    for( let i=0; i<this.appliances.length; i++) {
      applianceEnergyTotals[i] = this.totalAppliancesConsumption[i][1];
      applianceNames[i] = this.appliances[i].title;
    }
    this.lineChartData = [{data: applianceEnergyTotals, label: 'Appliances consumption'}];
    this.lineChartLabels = applianceNames;
  }

  uploadDaysLog () {
    var time = new Date();
    let alert = Alert.create({
      title: 'Ready to send',
      subTitle: 'You are about to send your data to the server.',
      buttons: [
        {
          text: 'Cancel',
          handler: alertData => {
            console.log('Cancel server sending.');
          }
        },
        {
          text: 'OK',
          handler: alertData => {
            var link = 'http://83.212.99.80/Amber/DayLogs/Days_api.php';
            this.dataToSend.uuid = this.uuid;
            this.dataToSend.timestamp = time;
            let dayPairs = [];
            for(let i = 0; i< this.loadedDays.length; i++) {
              let pair = {
                date: this.loadedDays[i].date,
                consumption: this.loadedDays[i].totalConsumedThisDay
              };
              dayPairs.push(pair);
            }
            this.dataToSend.dayPairs = dayPairs;
            var data = JSON.stringify(this.dataToSend);
            console.log(data);
            this.http.post(link, data)
            .subscribe(data => {
             this.response = data._body; //NOTE: Ignore error message, it is correct and works.
             console.log(this.response);
             setTimeout(() => {
               let alert = Alert.create({
                 title: 'Data sent successfully!',
                 subTitle: 'Thank you for contributing your data!',
                 buttons: ['OK']
               });
               this.nav.present(alert);
             }, 500);
             this.submittedLogsOn = time.toString();
             this.submittedLogs = true;
             this.dataService.localSetItem('submittedLogsOn', this.submittedLogsOn);
             this.dataService.localSetItem('submittedLogs', true);
            }, error => {
                console.log("Oooops!");
            });
          }
        }
      ]
    });
    this.nav.present(alert);
  }

}
