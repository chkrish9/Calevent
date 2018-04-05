import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedCal="";
  calenderList = ["calendar1","calendar2","calendar3","calendar4"];
  constructor(public navCtrl: NavController) {

  }

}
