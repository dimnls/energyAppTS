import {Page, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {Page1} from '../page1/page1';

/*
  Generated class for the IntroPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/intro/intro.html',
})
export class IntroPage {
  pushed: boolean;
  buttonMessage: String;
  constructor(public nav: NavController, navParams: NavParams) {
    this.pushed = navParams.get('pushed');
    if(this.pushed){
      this.buttonMessage = "Return to the App";
    } else {
      this.buttonMessage = "Start Using the App";
    }
  }

  goToHome() {
    if(this.pushed) {
      this.nav.pop();
    } else {
      this.nav.setRoot(TabsPage);
    }
  }

}
