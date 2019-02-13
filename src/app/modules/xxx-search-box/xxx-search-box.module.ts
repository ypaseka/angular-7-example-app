import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule} from '@angular/material';

import {XxxEventMgrModule} from '../../library/xxx-event-mgr/xxx-event-mgr.module';
import {XxxSearchBoxComponent} from './xxx-search-box.component';
import {XxxStateStoreModule} from '../../library/xxx-state-store/xxx-state-store.module';

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
