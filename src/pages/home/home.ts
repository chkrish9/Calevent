import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedCal="";
  calenderList = [];
  constructor(public navCtrl: NavController, private calender:Calendar, private platform:Platform) {
    this.platform.ready().then(()=>{
      this.calender.listCalendars().then( data => {
          this.calenderList = data;
      });
    });
  }

  createEvent(selectedCal){
    let date = new Date();
    let options = { calendarId :selectedCal.id, calendarName: selectedCal.name, firstReminderMinutes:15 };
    this.calender.createEventInteractivelyWithOptions('New Event','','adding new event',date,date,options).then( ()=>{

    });
  }
}
