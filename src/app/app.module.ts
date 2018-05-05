import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Calendar } from '@ionic-native/calendar';

import { PopoverComponent } from '../components/popover/popover';
import { DatabaseProvider } from '../providers/database/database';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLitePorter,
    SQLite,
    DatabaseProvider
  ]
})
export class AppModule {}
