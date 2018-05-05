import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Platform, ToastController } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public http: Http, private sqliteProter: SQLitePorter,
    private storage: Storage, private sqlite: SQLite,
    private platform: Platform,private toastCtrl: ToastController) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'calevent.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('databse_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            }
            else {
              this.fillDatabase();
            }
          })
        });
    });
  }

  fillDatabase() {
    this.http.get('assets/db/database.sql')
      .map(res => {
        return res.text();
      })
      .subscribe(sql => {
        this.sqliteProter.importSqlToDb(this.database, sql)
          .then(data => {
           // this.presentToast(JSON.stringify(data));
            this.databaseReady.next(true);
            this.storage.set('databse_filled', true);
          })
          .catch(e => console.log(e));
      })
  }

  getAllTagTitles() {
    return this.database.executeSql("SELECT * FROM tagtitle", []).then(data => {
      let tagtitles = [];

      for (var i = 0; i < data.rows.length; i++) {
        tagtitles.push(data.rows.item(i))
      }

      return tagtitles;
    }, err => {
      console.log("Error: ", err);
      return [];
    });
  }

  getAllTags() {
    return this.database.executeSql("SELECT * FROM tags", []).then(data => {
      let tags = [];

      for (var i = 0; i < data.rows.length; i++) {
        tags.push(data.rows.item(i))
      }

      return tags;
    }, err => {
      console.log("Error: ", err);
      return [];
    });
  }

  getDatabaseSate() {
    return this.databaseReady.asObservable();
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
