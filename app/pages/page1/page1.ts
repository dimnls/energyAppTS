import {Page, NavController, Platform, Loading, NavParams, Toast} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';
import {ItemDetailsPage} from '../item-details/item-details';
import {SocialSharing} from 'ionic-native';
import {Page3} from '../page3/page3';
import {DataService} from '../../providers/data/data';
import {ShowTipPage} from '../show-tip/show-tip';
import {DaysLogsPage} from '../days-logs/days-logs';
import {DayModel} from '../../models/day-model';
import {Clipboard} from 'ionic-native';
// import {Toast} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  statuses: any = require('../../statuses.json');

  time: Date;
  date: string;

  days: DayModel[];//
  username: string = '';

  constructor(public nav: NavController, public platform: Platform, public dataService: DataService, public navParams: NavParams, public myDay: DayModel) {
    this.time = new Date();
    this.date = this.time.toDateString();
    console.log(this.date);

    this.myDay = myDay;
    this.days = [];
    // this.dataService.localGetItem('username').then((value) => {
    //   this.username = value;
    // });

    //Check if there a stored CURRENT_DAY that matches today's date. If yes, load it.
    this.dataService.localGetItem('CURRENT_DAY').then((value) => {
      if( value != null ) {
        if( this.date == value.date ) { //NOTE: SAME DAY - just load data
          this.myDay.totalConsumedThisDay = value.totalConsumedThisDay;
          this.myDay.appliancesConsumption = value.appliancesConsumption;
          this.myDay.statusId = value.statusId;
          this.myDay.currentStatus = value.currentStatus;

          // this.dataService.localGetItem('DAYS_LOG').then((days_value) => {
          //   this.days = days_value;
          //   console.log(this.days);
          //   for(let i = 0; i < this.days.length; i++) {
          //     console.log(this.days[i].date + ' : ' + this.days[i].totalConsumedThisDay);
          //   }
          // });

        } else { //NOTE: OTHER DAY
          this.dataService.localSetItem('CURRENT_DAY', this.myDay); //NOTE: this is saving an empty day into storage

          if( value.totalConsumedThisDay != 0) { //only save previous day in LOG if totalConsumedThisDay IS NOT 0
            this.dataService.localSetItem(value.date, value); // save previous day object with date as label

            this.dataService.localGetItem('DAYS_LOG').then((days_value) => { //load DAYS_LOG from storage
              if( days_value != null ) { // if DAYS_LOG exists, load it, add previous day, store new
                this.days = days_value;
                this.days.push(value);
                console.log(this.days);
                this.dataService.localSetItem('DAYS_LOG', this.days);
              } else { // add previous day to days and store into DAYS_LOG
                this.days.push(value);
                console.log(this.days);
                this.dataService.localSetItem('DAYS_LOG', this.days);//
              }
            });
          }

        }
      }
    });

    this.refreshStatus();

  }

  showDaysLogs() {
    this.nav.push(DaysLogsPage, {
      dashPage: this
    });
  }

  showTip() {
    this.nav.push(ShowTipPage, {
      dashPage: this
    });
  }

  refreshStatus(){
    this.myDay.refreshStatus();
  }

  toast(message: string) {
    // Toast.show(message, '4000', 'top').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );

    let toast = Toast.create({
    message: message,
    duration: 4000
    });

    toast.onDismiss(() => {
    console.log('Dismissed toast');
    });

    this.nav.present(toast);
  }

  socialShare(message: string = 'I am using Amber to keep track of my Energy consumption! Get the app now! #MeetAmber', subject: string = null, file = null, link: string = 'http://meetamber.online') {
    this.toast('For Facebook sharing, use PASTE to share your Amber love!')
    this.platform.ready().then(() => {
      Clipboard.copy(message); //To be able to post to Facebook from the same button
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.share(message, subject, file, link);
      }
    });
  }

  consumptionShare(message: string = 'Today I have consumed '+ this.myDay.totalConsumedThisDay + 'W. #MeetAmber #EnergyAwareness' , subject: string = null, file = null, link: string = 'http://meetamber.online') {
    this.toast('For Facebook sharing, use PASTE to share your consumption!')
    this.platform.ready().then(() => {
      Clipboard.copy(message); //To be able to post to Facebook from the same button
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.share(message, subject, file, link);
      }
    });
  }

}
