import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {XxxDataModule} from '../xxx-data/xxx-data.module';
import {XxxEventMgrService} from './xxx-event-mgr.service';
import {XxxMessageModule} from '../xxx-message/xxx-message.module';

@NgModule({
  imports: [
    RouterModule,
    XxxDataModule,
    XxxMessageModule
  ],
  providers: [XxxEventMgrService]
})

export class XxxEventMgrModule {
}
