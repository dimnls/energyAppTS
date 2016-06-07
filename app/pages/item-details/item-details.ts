import {Page, NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the ItemDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/item-details/item-details.html',
})
export class ItemDetailsPage {
  currentTip: any;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.currentTip = this.navParams.get('dashPage').currentTip;
  }
}
