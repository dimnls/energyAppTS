import {Page, NavController, Platform, Loading} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';
import {ItemDetailsPage} from '../item-details/item-details';
import {SocialSharing} from 'ionic-native';
import {Page3} from '../page3/page3';
import {DataService} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  tips: any = require('../../tips.json');
  currentTipId: number;
  currentTip: any;
  totalConsumedToday: number;
  averageConsumption: number = 200;
  status: number;

  constructor(public nav: NavController, public platform: Platform, public dataService: DataService) {
    console.log('page1 constructor');
    this.nav = nav;
    this.platform = platform;


    this.randomTip();
    this.currentTip = this.tips[this.currentTipId];

    this.refreshStatus();
  }


  //initial random tip
  randomTip() {
    this.currentTipId = Math.floor(Math.random() * this.tips.length);
  }

  //refreshing tip, different from current
  getNewTip() {
    let oldTipId: number = this.currentTipId;
    let newCurrentTipId: number = oldTipId;
    do {
      newCurrentTipId = Math.floor(Math.random() * this.tips.length);
    }
    while( newCurrentTipId == oldTipId );
    this.currentTipId = newCurrentTipId;
    this.currentTip = this.tips[this.currentTipId];
  }

  goToIntro() {
    this.nav.push(IntroPage, {
      pushed: true
    });
  }

  goToUserInfo() {
    this.nav.push(UserInfoPage);
  }

  readMore() {
    this.nav.push(ItemDetailsPage, {
      dashPage: this
    });
  }

  refreshStatus() {
    this.dataService.localGetItem('totalConsumedToday').then((value) => {
      this.totalConsumedToday = value;
      console.log('loaded totalConsumedToday in Page1: ' + this.totalConsumedToday);

      if(value == 0) {
        this.status = 0;
      } else if(value >= (this.averageConsumption + 50)) {
        this.status = 1;
      } else if(value > (this.averageConsumption)) {
        this.status = 2;
      } else if(value <= (this.averageConsumption - 50)) {
        this.status = 4;
      } else if (value <= (this.averageConsumption)) {
        this.status = 3;
      }

    });
  }

  socialShare(message: string = null, subject: string = null, file = this.currentTip.image_b64, link: string = null) {
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



  facebookShare(message: string = null, subject: string = null, file: string = this.currentTip.image, link: string = null) {
    this.platform.ready().then(() => {
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.shareViaFacebook(message, subject, file, link, function(errormsg) {alert("Error: Facebook not installed")});
      }
    });
  }

  //show loader and call getNewTip() from loader
  loadingTip() {
    let loading = Loading.create({
      content: "Getting tip...",
    });
    this.nav.present(loading);
    setTimeout(() =>  {
      loading.dismiss();
      this.getNewTip();
    }, 700);
  }


}
