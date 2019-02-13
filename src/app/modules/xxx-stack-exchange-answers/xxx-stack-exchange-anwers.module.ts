import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material';

import {XxxStackExchangeAnswersComponent} from './xxx-stack-exchange-answers.component';
import {XxxStackExchangeAnswersRoutingModule} from './xxx-stack-exchange-answers-routing.module';

@NgModule({
  declarations: [XxxStackExchangeAnswersComponent],
  exports: [XxxStackExchangeAnswersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    XxxStackExchangeAnswersRoutingModule
  ]
})

export class XxxStackExchangeAnswersModule {
}
