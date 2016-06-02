import {Page, NavController, Platform} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';
import {ItemDetailsPage} from '../item-details/item-details';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  item: any;
  tipsJSON: any = require('../../tips.json');

  constructor(public nav: NavController, public platform: Platform) {
    this.nav = nav;
    this.platform = platform;

    this.item = {id: '1', title: 'Item 1', description: 'Item 1 description. Lorem ipsum.', image: 'images/blue-energy.jpg'};

    this.randomTip();
    console.log(this.tipsJSON[1]);


  }

  randomTip() {

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
