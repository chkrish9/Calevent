import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

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
  tagvalue:string;
  setTag = {
    tagName:'',
    tags:["abc","def"]
  };
  tagNameList = ["Birthday", "Marriage day", "Company", "Special"];
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTagPage');
  }

  addTag(){
    if(this.tagvalue!=="" && this.tagvalue!=null){
      var value=this.tagvalue;
      var isExist=this.setTag.tags.filter(function(item) { 
        return item.toLowerCase() === value.toLowerCase()
      });
      if(isExist.length < 1){
        this.setTag.tags.push(this.tagvalue);
        this.tagvalue='';
      }
    }
  }

  addTagTitle()
  {
    let prompt = this.alertCtrl.create({
      title: 'Add Tag Title',
      message: "Enter Tag Title",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data);
            var isExist=this.tagNameList.filter(function(item) { 
              return item.toLowerCase() === data.title.toLowerCase()
            });
            if(isExist.length < 1){
              this.tagNameList.push(data.title);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  deleteTagTitle(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Which tags you want to delete?');
    this.tagNameList.forEach(element => {
      alert.addInput({
        type: 'checkbox',
        label: element,
        value: element,
        checked: false
      });
    });
   
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Delete',
      handler: data => {
        console.log('Checkbox data:', data);
        data.forEach(element => {
          this.tagNameList = this.tagNameList.filter(function(item) { 
            return item !== element
          })
        }); 
        
      }
    });
    alert.present();
  }

  deleteItem(tag){
    this.setTag.tags = this.setTag.tags.filter(function(item) { 
        return item !== tag
    })
  }
  save(){
    this.view.dismiss();
  }
  closeModal(from){
      this.view.dismiss();
  }
}
