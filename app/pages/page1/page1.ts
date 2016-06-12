import {Page, NavController, Platform, Loading, NavParams} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';
import {ItemDetailsPage} from '../item-details/item-details';
import {SocialSharing} from 'ionic-native';
import {Page3} from '../page3/page3';
import {DataService} from '../../providers/data/data';
import {ShowTipPage} from '../show-tip/show-tip';
import {DayModel} from '../../models/day-model';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  statuses: any = require('../../statuses.json');
  //
  totalConsumedToday: number;
  averageConsumption: number = 200;
  //
  statusId: number = 4;
  currentStatus: any;

  time: Date;
  date: string;
  lastDate: string;
  tempDate: string = 'Tue Jun 07 2016';

  myDay: DayModel;
  //myUpdate() {};
  loadedDay: DayModel;

  constructor(public nav: NavController, public platform: Platform, public dataService: DataService, public navParams: NavParams) {

    this.myDay = this.navParams.get('day');
    //this.loading();

    this.currentStatus  = this.statuses[this.statusId];
    this.dateCheck(); //refresh status through dateCheck()

  }

  loading() {
    let loading = Loading.create({
      content: 'Loading status'
    });

    loading.onDismiss( data => {
      this.myDay = this.navParams.get('day');
      console.log('MY DAY CHANGED AFTER LOADING');
      console.log(this.myDay);
    });

    this.nav.present(loading);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);


  }

  myUpdate () {
    this.myDay = this.navParams.get('day');
    console.log(this.myDay);
  }

  showTip() {
    this.nav.push(ShowTipPage, {
      dashPage: this
    });
  }

  // refreshStatus() {
  //   this.dataService.localGetItem('today').then((value) => {
  //     this.today = value;
  //     console.log('loaded today = ' + this.today); //TODO: remove
  //     this.totalConsumedToday = this.today.totalConsumedThisDay;
  //     console.log('loaded today totalConsumedThisDay = ' + this.totalConsumedToday); //TODO: remove
  //     if(this.totalConsumedToday == null || value == 0) {
  //       this.statusId = 4;
  //     } else if(this.totalConsumedToday >= (this.averageConsumption + 50)) {
  //       this.statusId = 0;
  //     } else if(this.totalConsumedToday > (this.averageConsumption)) {
  //       this.statusId = 1;
  //     } else if(this.totalConsumedToday <= (this.averageConsumption - 50)) {
  //       this.statusId = 3;
  //     } else if (this.totalConsumedToday <= (this.averageConsumption)) {
  //       this.statusId = 2;
  //     }
  //
  //     this.currentStatus = this.statuses[this.statusId];
  //
  //   });
  // }

  refreshStatus() {
    let consumption = this.myDay.totalConsumedThisDay;

    if(consumption == null || consumption == 0) {
      this.statusId = 4;
    } else if(consumption >= (this.averageConsumption + 50)) {
      this.statusId = 0;
    } else if(consumption > (this.averageConsumption)) {
      this.statusId = 1;
    } else if(consumption <= (this.averageConsumption - 50)) {
      this.statusId = 3;
    } else if (consumption <= (this.averageConsumption)) {
      this.statusId = 2;
    }

    this.currentStatus = this.statuses[this.statusId];

  }



  dateCheck() {
    this.time = new Date();
    setInterval(() => this.time = new Date(), 1000);
    //get current date
    this.date = this.time.toDateString();
    //load last saved date
    this.dataService.localGetItem('lastDate').then((value) => {
      this.lastDate = value;
      //this.lastDate = this.tempDate; //TODO remove
      //console.log('last saved date: ' + this.lastDate); //TDOO remove

      if( this.date != this.lastDate ) {
        //console.log('dates not equal');
        this.dataService.localSetItem('lastDate', this.date);
        this.dataService.localSetItem('totalConsumedToday', 0).then(() => {
          this.refreshStatus();
        });

      } else { //last saved date is today, simply refresh status
        this.refreshStatus();
      }
    });
  }

  socialShare(message: string = 'I am using Amber to keep track of my Energy consumption! Get the app at http://meetamber.online', subject: string = null, file = null, link: string = 'http://meetamber.online') {
    this.platform.ready().then(() => {
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.share(message, subject, file, link);
      }
    });
  }

  // socialShare(myMessage: string = null, mySubject: string = null, myFile = this.currentTip.image, myLink: string = null) {
  //   var options = {
  //     message: myMessage,
  //     subject: mySubject,
  //     files: [myFile],
  //     url: myLink
  //   }
  //   var onSuccess = function(result) {
  //     alert("Sharing successful");
  //   }
  //   var onError = function(msg) {
  //     alert("Sharing failed.");
  //   }
  //   this.platform.ready().then(() => {
  //     if(window.plugins.socialsharing) {
  //       window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError).then(alert("loaded"));
  //     }
  //   });
  // }

  // facebookShare(message: string = null, subject: string = null, file: string = this.currentTip.image, link: string = null) {
  //   this.platform.ready().then(() => {
  //     if(window.plugins.socialsharing) {
  //       window.plugins.socialsharing.shareViaFacebook(message, subject, file, link, function(errormsg) {alert("Error: Facebook not installed")});
  //     }
  //   });
  // }



}
