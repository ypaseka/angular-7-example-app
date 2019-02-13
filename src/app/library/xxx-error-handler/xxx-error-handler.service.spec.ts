import {TestBed} from '@angular/core/testing';

import {MockXxxAlertService} from '../xxx-alert/mock-xxx-alert.service';
import {MockXxxLogService} from '../xxx-log/mock-xxx-log.service';
import {XxxAlertService} from '../xxx-alert/xxx-alert.service';
import {XxxErrorHandler} from './xxx-error-handler.service';
import {XxxLogService} from '../xxx-log/xxx-log.service';

class XxxLogEntry {
  constructor(message: string, level: any) {
  }
}

describe('XxxErrorHandler', () => {
  let spyAlertService: jasmine.Spy;
  let spyLogService: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxErrorHandler: XxxErrorHandler;
  let xxxLogService: XxxLogService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: XxxAlertService, useClass: MockXxxAlertService},
      XxxErrorHandler,
      {provide: XxxLogService, useClass: MockXxxLogService}
    ]
  }));

  beforeEach(() => {
    xxxAlertService = TestBed.get(XxxAlertService);
    xxxErrorHandler = TestBed.get(XxxErrorHandler);
    xxxLogService = TestBed.get(XxxLogService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    spyLogService = spyOn(xxxLogService, 'log');
  });

  it('should be created', () => {
    expect(xxxErrorHandler).toBeDefined();
  });

  it('should run XxxLogService on handleError', () => {
    xxxErrorHandler.handleError(new Error('test'));
    expect(spyLogService).toHaveBeenCalled();
  });

  it('should run XxxLogService on handleError', () => {
    xxxErrorHandler.handleError(new Error('test'));
    expect(spyAlertService).toHaveBeenCalled();
  });
});