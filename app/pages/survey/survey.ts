import {Page, NavController} from 'ionic-angular';
import {Http} from '@angular/http';

/*
  Generated class for the SurveyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/survey/survey.html',
})
export class SurveyPage {
  data = {
    username: '',
    response: ''
  }
  constructor(public nav: NavController, public http: Http) {
    this.http = http;
  }

  submit() {


    var link = 'http://83.212.99.80/Ionic_api.php';
        var data = JSON.stringify({username: this.data.username});

        this.http.post(link, data)
        .subscribe(data => {
         this.data.response = data._body;
        }, error => {
            console.log("Oooops!");
        });


  }

}
