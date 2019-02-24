import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule} from '@angular/material';

import {XxxEventMgrModule, XxxStateStoreModule} from '../../xxx-common';
import {XxxSearchBoxComponent} from './xxx-search-box.component';

@NgModule({
  declarations: [XxxSearchBoxComponent],
  exports: [XxxSearchBoxComponent],
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    XxxEventMgrModule,
    XxxStateStoreModule
  ]
})

export class XxxSearchBoxModule {
}
