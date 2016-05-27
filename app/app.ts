import {App, Platform, Storage, LocalStorage, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ViewChild} from '@angular/core';

import {TabsPage} from './pages/tabs/tabs';
import {IntroPage} from './pages/intro/intro';
import {DataService} from './providers/data/data';
import {UserInfoPage} from './pages/user-info/user-info'; //REMEMBER to import all pages needed for the menu

// var text = require('./tips.json');
var text = '{ "name": "John Johnson", "street": "Oslo street", "phone": 123456 }';
var obj = JSON.parse(text);

@App({
  // template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'build/app.html', //FOR MENU
  providers: [DataService],
  config: {
    tabbarPlacement: 'bottom'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  menuPages: Array<{title: string, component: any}>;
  local: LocalStorage;
  //UserInfo vars
  username: string;
  //Tips

  constructor(private platform: Platform, private menu: MenuController, private dataService: DataService) {
    this.initializeApp();
    this.menuPages = [
      {title: 'Edit user info', component: UserInfoPage},
      {title: 'Watch intro', component: IntroPage}
    ];
    this.dataService.localGetItem('name').then((value) => {
      this.username = value;
    });

    console.log(obj.name);

    this.goToIntroOrHome();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  //Check if it's first run and show Intro if it is. Other wise, jump into app
  goToIntroOrHome() {
    this.local = new Storage(LocalStorage);
    this.local.get('introShown').then((result: any) => {
      if(result) {
        this.rootPage = TabsPage;
      } else {
        this.local.set('introShown', 'true');
        this.rootPage = IntroPage;
        console.log('introShown='+this.local.get('introShown'));
      }
    })
  }

  openMenuPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(page.component, {appPage: this});
  }

  tipsInit() {
    // this.tips = [];
    // this.tips.push({
    //   id: '1',
    //   title: 'Save Energy!',
    //   description: 'There are many ways you can save energy!',
    //   icon: 'flask'
    // });
  }


}
