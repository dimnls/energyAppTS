import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {Page1} from '../page1/page1';
import {DataService} from '../../providers/data/data';

/*
  Generated class for the IntroPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Page({
  templateUrl: 'build/pages/intro/intro.html',
})
export class IntroPage {
  username: string = '';
  constructor(public nav: NavController, public navParams: NavParams, public dataService: DataService) {

  }

  goToHome() {
    if(this.username != '') {
      this.dataService.localSetItem('username', this.username);
      let alert = Alert.create({
        title: 'Welcome, '+this.username+'!',
        subTitle: 'Start meeting Amber!',
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.nav.setRoot(TabsPage);
            }
          }
        ]
      });
      this.nav.present(alert);

    }
    else {
      let alert = Alert.create({
        title: 'Did you forget something?',
        subTitle: 'Please let me know your name.',
        buttons: ['OK']
      });
      this.nav.present(alert);
    }

  }

}
