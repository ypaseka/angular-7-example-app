import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {XxxDataModule, XxxEventMgrService, XxxMessageModule} from '../../library';

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
