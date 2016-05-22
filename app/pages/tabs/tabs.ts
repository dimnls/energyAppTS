import {Page, NavController} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page3} from '../page3/page3';


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

  constructor(nav: NavController) {
    this.nav = nav;
  }
}
