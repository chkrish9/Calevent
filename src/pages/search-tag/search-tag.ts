import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  tagtitleid:string = "0";
  activetab:string= "tagtitles";
  // setTag = {
  //   tagName:'',
  //   tags:[]
  // };
  //tagNameList = ["Birthday", "Marriage day", "Company", "Special"];
  tagNameList = [];
  tags = [];
  selectedTags = [];
  path:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private view: ViewController, private alertCtrl: AlertController,
     private databasePro:DatabaseProvider,private toastCtrl: ToastController,
     private camera:Camera, private imagePicker:ImagePicker) {
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

  getTagsByTagTitle(tagtitleid){
   // this.presentToast(JSON.stringify(tagtitleid))
    this.databasePro.getTagsByTagTitleId(tagtitleid).then(data => {
      this.selectedTags = data;
    });
  }
  addTag(){
    if(this.tagvalue!=="" && this.tagvalue!=null && this.tagtitleid !== "0" && this.tagtitleid !== ""){
      var value=this.tagvalue;
      var isExist=this.tags.filter(function(item) { 
        return item.tagname.toLowerCase() === value.toLowerCase()
      });
      if(isExist.length < 1){
        this.databasePro.addTag(this.tagvalue,this.tagtitleid);
        this.getTagsByTagTitle(this.tagtitleid);
        this.tagvalue='';
      }else{
        this.presentToast("Tag already exits."); 
      }
    }
    else
    {
      if(this.tagtitleid === "0"){
        this.presentToast("Please select the tag title.");
      }else{
        this.presentToast("Please enter the tag.");
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
              return item.title.toLowerCase() === data.title.toLowerCase()
            });
            if(isExist.length < 1){
              this.databasePro.addTagTitle(data.title, '');
              this.loadTagTitles();
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
        label: element.title,
        value: element.id,
        checked: false
      });
    });
   
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Delete',
      handler: data => {
        console.log('Checkbox data:', data);
        data.forEach(element => {
          this.databasePro.deleteTagTitle(element).catch(e => this.presentToast(JSON.stringify(e)));
        }); 
        this.loadTagTitles();
        this.tagtitleid = "0";
        this.selectedTags = [];
      }
    });
    alert.present();
  }

  deleteItem(tag){
    this.databasePro.deleteTag(tag.id).catch(e => this.presentToast(JSON.stringify(e)));
    this.getTagsByTagTitle(this.tagtitleid);
  }
  save(){
    this.view.dismiss();
  }
  closeModal(from){
      this.view.dismiss();
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((url) => {
     this.path = url;
    }, (err) => {
     // Handle error
    });
  }

  chooseImage(){
    const options = {
      title: 'Select Picture',
      message: 'Select atleat 1 image',
      maximumImagesCount:1,
      outType: 0,
      quality:72,
      height:396,
      width:592
    }
    
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.path = results[i];
      }
    }, (err) => { });
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
