import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {XxxAlertService} from './library/xxx-alert/xxx-alert.service';
import {XxxErrorHandler} from './library/xxx-error-handler/xxx-error-handler.service';
import {XxxLogEntry, XxxLogLevelEnum} from './library/xxx-log/xxx-log-entry';
import {XxxLogService} from './library/xxx-log/xxx-log.service';
import {XxxMessageService} from './library/xxx-message/xxx-message.service';
import {XxxStackExchangeSearchService} from './modules/xxx-stack-exchange-search/xxx-stack-exchange-search.service';

@Component({
  selector: 'xxx-app',
  styleUrls: ['./xxx-app.component.scss'],
  templateUrl: './xxx-app.component.html'
})

export class XxxAppComponent implements OnDestroy {
  private subscriptionDataError: Subscription;

  constructor(
      private xxxAlertService: XxxAlertService,
      private xxxErrorHandler: XxxErrorHandler,
      private xxxLogService: XxxLogService,
      private xxxMessageService: XxxMessageService,
      private xxxStackExchangeSearchService: XxxStackExchangeSearchService
  ) {
    this.subscribeToMessages();
    this.xxxLogService.log(new XxxLogEntry('XxxAppComponent constructor', XxxLogLevelEnum.INFO));
  }

  ngOnDestroy() {
    this.subscriptionDataError.unsubscribe();
  }

  private subscribeToMessages(): void {
    this.subscriptionDataError = this.xxxMessageService.subscribe('data.responseError', (payload) => {
      this.xxxAlertService.openAlert(payload.alertType, payload.alertMessage);
    });
  }
}
