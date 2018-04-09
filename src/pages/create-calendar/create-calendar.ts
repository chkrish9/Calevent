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
    startDate: new Date(new Date().getTime() - new Date().getTimezoneOffset()*60000).toISOString(),
    timeStarts: '00:00',
    endDate: new Date(new Date().getTime() - new Date().getTimezoneOffset()*60000).toISOString(),
    timeEnds:'01:00',
    firstReminderMinutes:60,
    secondReminderMinutes:150,
    url:'',
    recurrence:'',
    recurrenceEndDate:new Date(new Date().getTime() - new Date().getTimezoneOffset()*60000).toISOString(),
    recurrenceInterval:1
  }
  showError = false;
  recurrenceList = ["daily", "weekly", "monthly", "yearly"];
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
      if(this.event.title !='')
      {
        this.view.dismiss(this.event);
      }
      else{
        this.showError = true;
      }
    }
  }

}
