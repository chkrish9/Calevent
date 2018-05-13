import { Component } from '@angular/core';
import { NavController, Platform, ToastController, ModalController, Modal } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { DatabaseProvider } from '../../providers/database/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedCal = "";
  cal = {};
  calenderList = [];
  events = [];
  // tagsList = [
  //   {
  //     tagName: "Birthday",
  //     tags: ["b'dy", "birthday"],
  //     image:"assets/imgs/birthday.jpg"
  //   },
  //   {
  //     tagName: "Marriage day",
  //     tags: ["marriage", "anniversary"],
  //     image:"assets/imgs/marriagean.jpg"
  //   },
  //   {
  //     tagName: "Company",
  //     tags: ["work", "developer", "join"],
  //     image:"assets/imgs/company.jpg"
  //   },
  //   {
  //     tagName: "Special",
  //     tags: ["talk", "saw"],
  //     image:"assets/imgs/special.jpg"
  //   }
  // ];
  tagsList = [];
  constructor(public navCtrl: NavController, private calender: Calendar, private platform: Platform,
    private toastCtrl: ToastController, private modalCtrl: ModalController, private popoverCtrl: PopoverController,
    private databasepro: DatabaseProvider) {
    this.platform.ready().then(() => {
      this.calender.listCalendars().then(data => {
        const dummy = [];
        data.forEach(element => {
          if (dummy.indexOf(element.name) < 0) {
            dummy.push(element.name);
            this.calenderList.push(element);
          }
        });
      });
     
    });
    this.databasepro.getDatabaseSate().subscribe( ready => {
      if(ready){
        this.databasepro.getTagList().then(data => {
          this.tagsList = data;
        });
      }
    });
  }

  listEvent() {
    this.cal = this.calenderList.filter((obj) => {
      return obj.name == this.selectedCal;
    })[0];

    if (this.platform.is('ios')) {
      this.calender.findAllEventsInNamedCalendar(this.selectedCal).then(data => {
        this.events = data;
      });
    } else if (this.platform.is('android')) {
      let start = new Date();
      let end = new Date();
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() + 366);
      this.calender.listEventsInRange(start, end).then(data => {
        this.events = data.filter((obj) => {
          this.addEventType(obj);
          return obj.calendar_id == this.cal["id"];
        });
      });
    }
  }

  addEventType(obj) {
    this.tagsList.forEach(tagObj => {
      var istrue=this.checkEventType(obj, tagObj);
      if(istrue){
        return;
      }
    });
  }

  checkEventType(obj, tagObj) {
    const tagName = tagObj.tagName;
    var tags = tagObj.tags;
    var image = tagObj.image;
    var istrue = false;
    tags.forEach(tag => {
      if (obj.title.toLowerCase().indexOf(tag.toLowerCase()) > -1) {
        obj["eventtype"] = tagName;
        obj["image"] = image;
        istrue = true;
        return true;
      }
    });
    return istrue;
  }

  createEvent() {
    var model: Modal = this.modalCtrl.create('CreateCalendarPage');
    model.present();

    model.onDidDismiss((data) => {
      //this.presentToast(JSON.stringify(data));
      let date = new Date();
      date.setDate(date.getDate() + 31)
      let options = {};

      options["firstReminderMinutes"] = data.firstReminderMinutes; // default is 60, pass in null for no reminder
      options["secondReminderMinutes"] = data.secondReminderMinutes;
      options["url"] = data.url;
      options["calendar.calendarName"] = this.cal["name"]; // iOS only, created for you if not found
      options["calendarId"] = this.cal["id"]; // Android only, use id obtained from listCalendars()

      //recurrence options
      if (data.recurrence != '') {
        options["recurrence"] = data.recurrence; // supported are: daily, weekly, monthly, yearly
      }
      if (data.recurrenceEndDate != null) {
        options["recurrenceEndDate"] = new Date(data.recurrenceEndDate); // leave empty to recur forever
      }
      options["recurrenceInterval"] = data.recurrenceInterval; // once every 2 months in this case, default: 1

      //create the event
      //cal.createEventWithOptions(title, loc, notes, start, end, options, success, error);
      if (data['title'] !== '') {
        this.calender.createEventWithOptions(data['title'], data['location'], 'adding new event',
          new Date(new Date(new Date(data['startDate']).toDateString() + ' ' + data['timeStarts'])),
          new Date(new Date(new Date(data['endDate']).toDateString() + ' ' + data['timeEnds'])), options).then(() => {
            this.presentToast(JSON.stringify("New Event added successfuly"));
            this.listEvent();
          });
      } else {
        this.presentToast(JSON.stringify("New Event fail to add"));
      }

    });
  }

  filterEvents() {
    var model: Modal = this.modalCtrl.create('FilterCalPage');
    model.present();
    model.onDidDismiss(data => {
      
    });
    //this.presentToast(JSON.stringify("Filter event"));
    
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverComponent);

    popover.present({
      ev: ev
    });
  }

  deleteEvent(ev) {
    this.calender.deleteEvent(ev.title, ev.eventLocation, null, new Date(ev.dtstart), new Date(ev.dtend)).then(() => {
      this.presentToast(JSON.stringify("Deleted successfuly"));
      this.listEvent();
    });;
  }

  parseDate(date) {
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
