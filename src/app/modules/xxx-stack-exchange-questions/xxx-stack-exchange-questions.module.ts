import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';

import {XxxAlertModule, XxxDataModule, XxxEventMgrModule, XxxStateStoreModule} from '../../xxx-common';
import {XxxStackExchangeQuestionsComponent} from './xxx-stack-exchange-questions.component';
import {XxxStackExchangeQuestionsRoutingModule} from './xxx-stack-exchange-questions-routing.module';

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
