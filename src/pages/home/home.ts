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
      this.presentToast(JSON.stringify(this.calender.getCalendarOptions()));
      if(this.platform.is('ios')){
        this.calender.findAllEventsInNamedCalendar(this.selectedCal).then( data =>{
          this.events = data;
        });
      }else if (this.platform.is('android')){
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() + 31);
        this.calender.listEventsInRange(start,end).then(data => {
          this.events=data;
        });
      }
  }

  createEvent(){
    let date = new Date();
    let options = { calendarId :this.cal["id"], calendarName: this.cal["name"], firstReminderMinutes:15 };
    this.calender.createEventWithOptions('New Event','','adding new event',date,date,options).then( ()=>{
      this.presentToast(JSON.stringify("New Event added successfuly"));
    });
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
