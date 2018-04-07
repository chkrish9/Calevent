import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCalendarPage } from './create-calendar';

@NgModule({
  declarations: [
    CreateCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCalendarPage),
  ],
})
export class CreateCalendarPageModule {}
