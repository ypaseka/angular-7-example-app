import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';

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
    XxxStackExchangeQuestionsRoutingModule
  ]
})

export class XxxStackExchangeQuestionsModule {
}
