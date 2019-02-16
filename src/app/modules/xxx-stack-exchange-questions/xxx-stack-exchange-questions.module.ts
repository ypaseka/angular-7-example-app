import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';

import {XxxAlertModule} from '../../library/xxx-alert/xxx-alert.module';
import {XxxDataModule} from '../../library/xxx-data/xxx-data.module';
import {XxxEventMgrModule} from '../../library/xxx-event-mgr/xxx-event-mgr.module';
import {XxxStackExchangeQuestionsComponent} from './xxx-stack-exchange-questions.component';
import {XxxStackExchangeQuestionsRoutingModule} from './xxx-stack-exchange-questions-routing.module';
import {XxxStateStoreModule} from '../../library/xxx-state-store/xxx-state-store.module';

@NgModule({
  declarations: [XxxStackExchangeQuestionsComponent],
  exports: [XxxStackExchangeQuestionsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressSpinnerModule,
    XxxAlertModule,
    XxxDataModule,
    XxxEventMgrModule,
    XxxStateStoreModule,
    XxxStackExchangeQuestionsRoutingModule
  ]
})

export class XxxStackExchangeQuestionsModule {
}
