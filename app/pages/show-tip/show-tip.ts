import {Page, NavController, Loading} from 'ionic-angular';

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


  constructor(public nav: NavController) {
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

}
