import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedCal= "";
  cal={};
  calenderList = [];
  events=[];
  constructor(public navCtrl: NavController, private calender:Calendar, private platform:Platform,private toastCtrl:ToastController) {
    this.platform.ready().then(()=>{
      this.calender.listCalendars().then( data => {
          this.calenderList = data;
      });
    });
  }

  listEvent(){
      this.cal = this.calenderList.filter((obj)=> { 
        return obj.name==this.selectedCal; 
      })[0];
      
      if(this.platform.is('ios')){
        this.calender.findAllEventsInNamedCalendar(this.selectedCal).then( data =>{
          this.events = data;
        });
      }else if (this.platform.is('android')){
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() + 31);
        this.calender.listEventsInRange(start,end).then(data => {
          this.events = data.filter((obj)=> { 
            return obj.calendar_id==this.cal["id"]; 
          });;
        });
      }
  }

  createEvent(){
    let date = new Date();
    date.setDate(date.getDate() + 31)
    let options = {};

    options["firstReminderMinutes"] = 15; // default is 60, pass in null for no reminder
    options["secondReminderMinutes"] = 120;
    options["url"] = "https://chkrish9.github.io/Portfolio/";
    options["calendar.calendarName"] = this.cal["name"]; // iOS only, created for you if not found
    options["calendarId"] = this.cal["id"]; // Android only, use id obtained from listCalendars()

    // recurrence options
    //options["recurrence"] = "monthly"; // supported are: daily, weekly, monthly, yearly
    //options["recurrenceEndDate"] = new Date(2016,10,1); // leave empty to recur forever
    //options["recurrenceInterval"] = 2; // once every 2 months in this case, default: 1

    // create the event
    //cal.createEventWithOptions(title, loc, notes, start, end, options, success, error);

    this.calender.createEventWithOptions('New Event','','adding new event',date,date,options).then( ()=>{
      this.presentToast(JSON.stringify("New Event added successfuly"));
      this.listEvent();
    });
  }

  filterEvents(){
    this.presentToast(JSON.stringify("Filter event"));
    //this.calender.findEventWithOptions(title, location, notes, startDate, endDate, options)
    this.listEvent();
  }

  deleteEvent(ev){
    this.calender.deleteEvent(ev.title, ev.eventLocation, null, new Date(ev.dtstart), new Date(ev.dtend)).then( ()=>{
      this.presentToast(JSON.stringify("Deleted successfuly"));
      this.listEvent();
    });;
  }

  parseDate(date){
    return new Date(date).toLocaleString();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
