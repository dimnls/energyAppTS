import {Page, NavController, Platform, Loading} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';
import {ItemDetailsPage} from '../item-details/item-details';
import {SocialSharing} from 'ionic-native';
import {Page3} from '../page3/page3';
import {DataService} from '../../providers/data/data';
import {ShowTipPage} from '../show-tip/show-tip';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  statuses: any = require('../../statuses.json');

  totalConsumedToday: number;
  averageConsumption: number = 200;

  statusId: number = 4;
  currentStatus: any;

  time: Date;
  date: string;
  savedDate: string;
  tempDate: string = 'Tue Jun 07 2016';
  datesNotEqual: boolean;

  constructor(public nav: NavController, public platform: Platform, public dataService: DataService) {
    console.log('page1 constructor');

    this.currentStatus  = this.statuses[this.statusId];
    this.dateCheck();
    //this.refreshStatus();


    console.log('status = ' + this.statusId);

  }

  showTip() {
    this.nav.push(ShowTipPage, {
      dashPage: this
    });
  }

  refreshStatus() {
    this.dataService.localGetItem('totalConsumedToday').then((value) => {
      this.totalConsumedToday = value;
      console.log('loaded totalConsumedToday in Page1: ' + this.totalConsumedToday);

      if(value == null || value == 0) {
        this.statusId = 4;
      } else if(value >= (this.averageConsumption + 50)) {
        this.statusId = 0;
      } else if(value > (this.averageConsumption)) {
        this.statusId = 1;
      } else if(value <= (this.averageConsumption - 50)) {
        this.statusId = 3;
      } else if (value <= (this.averageConsumption)) {
        this.statusId = 2;
      }

      this.currentStatus = this.statuses[this.statusId];
      console.log('status refreshed, = ' + this.statusId);

    });
  }

  dateCheck() {
    this.time = new Date();
    setInterval(() => this.time = new Date(), 1000);
    this.date = this.time.toDateString();
    //load saved date
    this.dataService.localGetItem('savedDate').then((value) => {
      this.savedDate = value;
      //this.savedDate = this.tempDate; //TODO remove
      if( this.date != this.savedDate ) {
        console.log('dates not equal');
        this.datesNotEqual = true;
        this.dataService.localSetItem('savedDate', this.date);
        this.dataService.localSetItem('totalConsumedToday', 0).then(() => {
          this.refreshStatus();
        });
      } else {
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
