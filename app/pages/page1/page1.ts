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

  averageConsumption: number = 200;

  statusId: number = 0;
  currentStatus: any;

  time: Date;
  date: string;

  constructor(public nav: NavController, public platform: Platform, public dataService: DataService, public navParams: NavParams, public myDay: DayModel) {
    this.time = new Date();
    this.date = this.time.toDateString();
    console.log(this.date);
    //this.date = 'Mon Jun 13 2016'; //TODO: remove
    this.myDay = myDay;

    //Check if there a stored CURRENT_DAY that matches today's date. If yes, load it.
    this.dataService.localGetItem('CURRENT_DAY').then((value) => {
      if( value != null ) {
        if( this.date == value.date ) {
          this.myDay.totalConsumedThisDay = value.totalConsumedThisDay;
          this.myDay.appliancesConsumption = value.appliancesConsumption;
          this.myDay.statusId = value.statusId;
          this.myDay.currentStatus = value.currentStatus;
        } else {
          this.dataService.localSetItem(value.date, value);
          this.dataService.localSetItem('CURRENT_DAY', this.myDay);
        }
      }
    });

    this.currentStatus  = this.statuses[this.myDay.statusId];

    this.refreshStatus();

  }

  showTip() {
    this.nav.push(ShowTipPage, {
      dashPage: this
    });
  }

  refreshStatus(){
    this.myDay.refreshStatus();
    this.currentStatus  = this.statuses[this.myDay.statusId];
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
