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
    private platform: Platform, private toastCtrl: ToastController) {
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

  getTagList() {
    return this.getAllTagTitles().then(data => {
      let tagList = [];
      data.forEach(element => {
        let tagObj = {
          tagName: element.title,
          image: element.imagename
        }
        this.getTagsByTagTitleId(element.id).then(tags => {
          tagObj["tags"] =tags.map(a => a.tagname);;
          tagList.push(tagObj);
        });
      });
      return tagList;
    });

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

  getTagsByTagTitleId(titleId) {
    return this.database.executeSql("SELECT * FROM tags WHERE tagtitleid = " + titleId, []).then(data => {
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

  addTagTitle(title, imagename) {
    let data = [title, imagename];
    this.presentToast(JSON.stringify(data));
    return this.database.executeSql("INSERT INTO tagtitle (title, imagename) values (?,?)", data).then(res => {
      return res;
    });
  }

  addTag(tagname, tagtitleid) {
    let data = [tagname, tagtitleid];
    return this.database.executeSql("INSERT INTO tags (tagname, tagtitleid) values (?,?)", data).then(res => {
      return res;
    });
  }

  updateImage(imagename, id) {
    return this.database.executeSql("UPDATE tagtitle SET imagename ="+ imagename +"WHERE id ="+id, []).then(res => {
      return res;
    });
  }

  deleteTagTitle(tagtitleid) {
    this.getTagsByTagTitleId(tagtitleid).then(data => {
      data.forEach(tag => {
        this.deleteTag(tag.id);
      });
    });
    return this.database.executeSql("DELETE FROM tagtitle WHERE id = " + tagtitleid, []).then(res => {
      return res;
    });
  }

  deleteTag(tagid) {
    return this.database.executeSql("DELETE FROM tags WHERE id = " + tagid, []).then(res => {
      return res;
    });
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
