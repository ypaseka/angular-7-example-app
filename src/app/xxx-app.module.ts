import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {XxxAlertModule} from './library/xxx-alert/xxx-alert.module';
import {XxxAppComponent} from './xxx-app.component';
import {XxxAppRoutingModule} from './xxx-app-routing.module';
import {XxxErrorHandlerModule} from './library/xxx-error-handler/xxx-error-handler.module';
import {XxxHeaderModule} from './modules/xxx-header/xxx-header.module';
import {XxxLogModule} from './library/xxx-log/xxx-log.module';
import {XxxMessageModule} from './library/xxx-message/xxx-message.module';
import {XxxStackExchangeAnswersModule} from './modules/xxx-stack-exchange-answers/xxx-stack-exchange-anwers.module';
import {XxxStackExchangeQuestionsModule} from './modules/xxx-stack-exchange-questions/xxx-stack-exchange-questions.module';
import {XxxStackExchangeSearchModule} from './modules/xxx-stack-exchange-search/xxx-stack-exchange-search.module';

@NgModule({
  bootstrap: [XxxAppComponent],
  declarations: [XxxAppComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    XxxAlertModule,
    XxxErrorHandlerModule,
    XxxHeaderModule,
    XxxLogModule,
    XxxMessageModule,
    XxxStackExchangeAnswersModule,
    XxxStackExchangeQuestionsModule,
    XxxStackExchangeSearchModule,
    XxxAppRoutingModule
  ]
})

export class XxxAppModule {
}
