import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material';

import {XxxAlertModule} from '../../library/xxx-alert/xxx-alert.module';
import {XxxDataModule} from '../../library/xxx-data/xxx-data.module';
import {XxxEventMgrModule} from '../../library/xxx-event-mgr/xxx-event-mgr.module';
import {XxxStackExchangeAnswersComponent} from './xxx-stack-exchange-answers.component';
import {XxxStackExchangeAnswersRoutingModule} from './xxx-stack-exchange-answers-routing.module';
import {XxxStateStoreModule} from '../../library/xxx-state-store/xxx-state-store.module';

@NgModule({
  declarations: [XxxStackExchangeAnswersComponent],
  exports: [XxxStackExchangeAnswersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    XxxAlertModule,
    XxxDataModule,
    XxxEventMgrModule,
    XxxStateStoreModule,
    XxxStackExchangeAnswersRoutingModule
  ]
})

export class XxxStackExchangeAnswersModule {
}
