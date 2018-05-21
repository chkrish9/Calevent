import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTagPage } from './search-tag';

@NgModule({
  declarations: [
    SearchTagPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTagPage),
  ],
})
export class SearchTagPageModule {}
