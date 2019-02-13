import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material';

import {XxxHeaderComponent} from './xxx-header.component';
import {XxxSearchBoxModule} from '../xxx-search-box/xxx-search-box.module';

@NgModule({
  declarations: [XxxHeaderComponent],
  exports: [XxxHeaderComponent],
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    XxxSearchBoxModule
  ]
})

export class XxxHeaderModule {
}
