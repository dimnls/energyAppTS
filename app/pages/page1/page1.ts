import {Page, NavController} from 'ionic-angular';
import {IntroPage} from '../intro/intro';
import {TabsPage} from '../tabs/tabs';
import {UserInfoPage} from '../user-info/user-info';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {
  constructor(public nav: NavController) {
    this.nav = nav;
  }

  goToIntro() {
    this.nav.push(IntroPage, {
      pushed: true
    });
  }

  goToUserInfo() {
    this.nav.push(UserInfoPage);
  }
}
