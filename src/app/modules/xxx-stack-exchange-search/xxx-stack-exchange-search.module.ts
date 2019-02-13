import {NgModule} from '@angular/core';

import {XxxEventMgrModule} from '../../library/xxx-event-mgr/xxx-event-mgr.module';
import {XxxMessageModule} from '../../library/xxx-message/xxx-message.module';
import {XxxStackExchangeSearchService} from './xxx-stack-exchange-search.service';
import {XxxStateStoreModule} from '../../library/xxx-state-store/xxx-state-store.module';

@NgModule({
  imports: [
    XxxEventMgrModule,
    XxxMessageModule,
    XxxStateStoreModule
  ],
  providers: [XxxStackExchangeSearchService]
})

export class XxxStackExchangeSearchModule {
}
