import {Page, NavController, NavParams} from 'ionic-angular';
import {DayModel} from '../../models/day-model';
import {DataService} from '../../providers/data/data';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

/*
  Generated class for the DaysLogsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/days-logs/days-logs.html',
})
export class DaysLogsPage {

  days: DayModel[];
  loadedDays: DayModel[];
  constructor(public nav: NavController, public dataService: DataService) {
    this.days = [];
    //this.loadedDays = this.navParams.get('appPage').days;
    ///this.loadedDays.reverse();

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
  }
}
