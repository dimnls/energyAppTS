import {Page, NavController, Platform} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor(public nav: NavController, public platform: Platform) {
    this.nav = nav;
    this.platform = platform;
  }

  goToIntro() {
    this.nav.push(IntroPage, {
      pushed: true
    });
  }

  goToUserInfo() {
    this.nav.push(UserInfoPage);
  }

  socialShare(){
    window.plugins.socialsharing.share('Message, image and link', null, 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
  }
}
