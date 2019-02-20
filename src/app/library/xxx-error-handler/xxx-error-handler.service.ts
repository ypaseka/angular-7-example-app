import {ErrorHandler, Injectable} from '@angular/core';

import {XxxAlertService, XxxAlertType, XxxLogEntry, XxxLogService} from '../../library';

@Injectable()
export class XxxErrorHandler implements ErrorHandler {
  constructor(
      private xxxAlertService: XxxAlertService,
      private xxxLogService: XxxLogService) {
  }

  handleError(error: Error) {
    const logEntry: XxxLogEntry = new XxxLogEntry(error.message);
    logEntry.stack = error.stack;
    this.xxxLogService.log(logEntry);
    // TODO temporary don't handle known error from Angular Flex
    if (error.message.includes('split')) {
      return;
    }
    this.xxxAlertService.openAlert(XxxAlertType.ERROR, 'An error occurred. Try again or contact Customer Service.');
  }
}
