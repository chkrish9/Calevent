import { Component } from '@angular/core';
import { ViewController, ModalController,Modal } from 'ionic-angular';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  constructor(public viewCtrl: ViewController, private modalCtrl: ModalController) {}

  close() {
    var model: Modal = this.modalCtrl.create('SearchTagPage');
    model.present();
    this.viewCtrl.dismiss();
  }

}
