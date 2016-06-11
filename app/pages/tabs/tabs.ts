import {Page, NavController, NavParams} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page3} from '../page3/page3';
import {DayModel} from '../../models/day-model';
import {DataService} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Page1;
  // tab2Root: any = Page2;
  tab3Root: any = Page3;
  nav: NavController;

  public myDay: DayModel;

  constructor(nav: NavController, public navParams: NavParams, public dataService: DataService) {
    this.nav = nav;

    this.myDay = new DayModel('THIS IS A TESTING MODEL');
    // this.dataService.localSetItem('TEST MODEL', this.myDay).then(() => {
    //   console.log('TEST MODEL CREATED AND SAVED.');
    // });

  }

  mySave() {
    this.dataService.localSetItem('TEST MODEL', this.myDay).then(() => {
      console.log(this.myDay);
      return;
    });
  }

  myChangeDate () {
    this.myDay.date = 'CHANGED DATE';
    this.dataService.localSetItem('TEST MODEL', this.myDay).then(() => {
      console.log(this.myDay);
      return;
    });
  }
}
