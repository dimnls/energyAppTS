import {Page, NavController, Loading, Toast, Platform} from 'ionic-angular';
import {Clipboard} from 'ionic-native';
/*
  Generated class for the ShowTipPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/show-tip/show-tip.html',
})
export class ShowTipPage {
  tips: any = require('../../tips.json');
  currentTipId: number;
  currentTip: any;


  constructor(public nav: NavController, public platform: Platform) {
    this.randomTip();

  }

  //initial random tip
  randomTip() {
    this.currentTipId = Math.floor(Math.random() * this.tips.length);
    this.currentTip = this.tips[this.currentTipId];

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

  socialShare(message: string = this.currentTip.description + ' #MeetAmber #EnergyFacts ', subject: string = this.currentTip.title, file = null, link: string = 'http://meetamber.online') {
    this.toast('For Facebook sharing, use PASTE to share the tip!')
    this.platform.ready().then(() => {
      Clipboard.copy(message); //To be able to post to Facebook from the same button
      if(window.plugins.socialsharing) {
        window.plugins.socialsharing.share(message, subject, file, link);
      }
    });
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

}
