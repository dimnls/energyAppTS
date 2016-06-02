import {Page, NavController, Platform} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';
import {ItemDetailsPage} from '../item-details/item-details';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  tips: any = require('../../tips.json');
  currentTipId: number;
  currentTip: any;

  constructor(public nav: NavController, public platform: Platform) {

    this.randomTip();
    console.log('Random Tip id:' + this.currentTipId);

    this.currentTip = this.tips[this.currentTipId];


  }

  randomTip() {
    this.currentTipId = Math.floor(Math.random() * this.tips.length);
  }

  getNewTip() {
    let oldTipId: number = this.currentTipId;
    let newCurrentTipId: number = oldTipId;
    console.log('oldTipId: ' + oldTipId);
    console.log('newCurrentTipId: ' + newCurrentTipId);
    do {
      newCurrentTipId = Math.floor(Math.random() * this.tips.length);
      console.log('while loop newCurrentTipId: ' + newCurrentTipId);
    }
    while( newCurrentTipId == oldTipId );
    console.log('exited while loop');
    this.currentTipId = newCurrentTipId;
    this.currentTip = this.tips[this.currentTipId];
  }

  goToIntro() {
    this.nav.push(IntroPage, {
      pushed: true
    });
  }

  goToUserInfo() {
    this.nav.push(UserInfoPage);5
  }

  readMore(item) {
    this.nav.push(ItemDetailsPage, {
      item: item
    });
  }

  socialShare(message: string ='Message here', subject: string = null, file: string ='https://www.google.nl/images/srpr/logo4w.png', link: string = 'http://www.x-services.nl') {
    this.platform.ready().then(() => {
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.share(message, subject, file, link);
      }
    });
  }

  facebookShare(message: string ='Message here', subject: string = null, file: string ='https://www.google.nl/images/srpr/logo4w.png', link: string = 'http://www.x-services.nl') {
    this.platform.ready().then(() => {
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.shareViaFacebook(message, subject, file, link, function(errormsg) {alert("Error: Facekook not installed")});
      }
    });
  }

}
