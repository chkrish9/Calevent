import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

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
  tagtitleid:number;
  // setTag = {
  //   tagName:'',
  //   tags:[]
  // };
  //tagNameList = ["Birthday", "Marriage day", "Company", "Special"];
  tagNameList = [];
  tags = [];
  selectedTags = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private view: ViewController, private alertCtrl: AlertController,
     private databasePro:DatabaseProvider,private toastCtrl: ToastController) {
    this.databasePro.getDatabaseSate().subscribe( ready => {
      if(ready){
          this.loadTagTitles();
          this.loadTags();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTagPage');
  }

  loadTagTitles(){
    this.databasePro.getAllTagTitles().then(data => {
      this.tagNameList = data;
    });
  }

  loadTags(){
    this.databasePro.getAllTags().then(data => {
      this.tags = data;
    });
  }

  getTagsByTagTitle(){
    this.selectedTags = this.tags.filter((tag)=>{
      return tag.tagtitleid === this.tagtitleid;
    });
  }
  addTag(){
    if(this.tagvalue!=="" && this.tagvalue!=null){
      var value=this.tagvalue;
      var isExist=this.tags.filter(function(item) { 
        return item.toLowerCase() === value.toLowerCase()
      });
      if(isExist.length < 1){
        this.tags.push(this.tagvalue);
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
    this.tags = this.tags.filter(function(item) { 
        return item !== tag
    })
  }
  save(){
    this.view.dismiss();
  }
  closeModal(from){
      this.view.dismiss();
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
