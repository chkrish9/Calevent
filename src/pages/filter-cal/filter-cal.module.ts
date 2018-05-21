import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterCalPage } from './filter-cal';

@NgModule({
  declarations: [
    FilterCalPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterCalPage),
  ],
})
export class FilterCalPageModule {}
