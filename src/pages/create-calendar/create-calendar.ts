import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-calendar',
  templateUrl: 'create-calendar.html',
})
export class CreateCalendarPage { 
   event = {
    title:'',
    location:'',
    startDate: new Date().toDateString(),
    timeStarts: '00:00',
    endDate: new Date().toDateString(),
    timeEnds:'01:00'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCalendarPage');
  }

  closeModal(from){
    if(from === "close"){
      this.view.dismiss();
    }
    else{
      this.view.dismiss(this.event);
    }
  }

}
