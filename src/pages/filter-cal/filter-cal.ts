import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filter-cal',
  templateUrl: 'filter-cal.html',
})
export class FilterCalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterCalPage');
  }
  closeModal(from){
    this.view.dismiss();
  }

}
