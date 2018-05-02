import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SearchTagPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-tag',
  templateUrl: 'search-tag.html',
})
export class SearchTagPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTagPage');
  }
  closeModal(from){
    if(from === "close"){
      this.view.dismiss();
    }
    // else{
    //   if(this.event.title !='')
    //   {
    //     this.view.dismiss(this.event);
    //   }
    //   else{
    //     this.showError = true;
    //   }
    // }
  }
}
