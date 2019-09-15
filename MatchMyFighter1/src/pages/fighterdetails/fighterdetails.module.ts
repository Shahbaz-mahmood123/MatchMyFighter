import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FighterdetailsPage } from './fighterdetails';

@NgModule({
  declarations: [
    FighterdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FighterdetailsPage),
  ],
})
export class FighterdetailsPageModule {}
