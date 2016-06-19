import {Page, NavController, Platform, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {Device} from 'ionic-native';
import {ViewChild} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {DataService} from '../../providers/data/data';


/*
  Generated class for the SurveyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/survey/survey.html',
})
export class SurveyPage {
  submittedForm: boolean = false;
  dataToSend: any;

  response: string;
  uuid: string;

  theForm: ControlGroup;
  qs1Changed: boolean = false;
  qs2Changed: boolean = false;

  constructor(public platform: Platform, public nav: NavController, public http: Http, private formBuilder: FormBuilder, public dataService: DataService) {
    this.http = http;
    this.dataToSend = {};
    this.dataService = dataService;

    this.platform.ready().then(() => {
      this.uuid = Device.device.uuid;
      this.dataService.localGetItem('submittedForm').then((value) => {
        if(value) {
          this.submittedForm = true;
        }
      });
    });

    this.theForm = formBuilder.group({
        qs1: ['', Validators.required],
        qs2: ['', Validators.required]
    });


  }

  save () {
    if(!this.theForm.valid){
      let alert = Alert.create({
        title: 'Invalid form.',
        subTitle: 'Please answer all the questions.',
        buttons: ['OK']
      });
      this.nav.present(alert);
      console.log('Invalid form');
    } else {
      console.log('Valid form');
      let alert = Alert.create({
        title: 'Ready to send',
        subTitle: 'You are about to send your answers to the server.',
        buttons: [
          {
            text: 'Cancel',
            handler: alertData => {
              console.log('Cancel server sending.');
            }
          },
          {
            text: 'OK',
            handler: alertData => {
              this.dataToSend.uuid = this.uuid;
              var time = new Date();
              this.dataToSend.timestamp = time;
              this.dataToSend.form = this.theForm.value;
              console.log(this.dataToSend);
              var data = JSON.stringify(this.dataToSend);
              console.log(data);
              this.submit(data);
            }
          }
        ]
      });
      this.nav.present(alert);
    }

  }

  submit(data) {
    var link = 'http://83.212.99.80/Amber/Ionic_api.php';
    this.http.post(link, data)
    .subscribe(data => {
     this.response = data._body; //NOTE: Ignore error message, it is correct and works.
     console.log(this.response);
     this.submittedForm = true;
     this.dataService.localSetItem('submittedForm', true);
     setTimeout(() => {
       let alert = Alert.create({
         title: 'Answers sent successfully!',
         subTitle: 'Thank you for contributing your data!',
         buttons: ['OK']
       });
       this.nav.present(alert);
     }, 500);
    }, error => {
        console.log("Oooops!");
    });
  }

}
