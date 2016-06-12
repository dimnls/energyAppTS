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

  time: Date;
  date: string;
  lastDate: string;
  tempDate: string = 'Tue Jun 07 2016';

  //myDay: DayModel;

  constructor(public nav: NavController, public navParams: NavParams, public dataService: DataService, public myDay: DayModel) {
    this.nav = nav;
    this.myDay = myDay;


    this.time = new Date();
    setInterval(() => this.time = new Date(), 1000);
    this.date = this.time.toDateString();


    //Create new model
    //this.myDay = new DayModel('CURRENT_DATE');
    //this.dataService.localSetItem('CURRENT_DAY', this.myDay);

    // this.myDay = this.dataService.localGetItem('CURRENT_DAY').then((value) => {
    //   this.myDay = value;
    //   console.log(this.myDay);
    // });
    // console.log('MY DAY:');
    // console.log(this.myDay);
    //this.dateCheck();

  }

  // dateCheck() {
  //   if (this.myDay == null ) {
  //     this.myDay = new DayModel(this.date);
  //     this.dataService.localSetItem('CURRENT_DAY', this.myDay);
  //     console.log('NEW DAY CREATED, FIRST TIME');
  //   } else if (this.date != this.myDay.date) {
  //     this.dataService.localSetItem('CURRENT_DAY', this.myDay).then(() => {
  //       this.myDay = new DayModel(this.date);
  //       console.log('PREVIOUS DAY SAVED, NEW DAY CREATED');
  //       return;
  //     });
  //   } else {
  //     console.log('DATES EQUAL');
  //   }
  // }



}
