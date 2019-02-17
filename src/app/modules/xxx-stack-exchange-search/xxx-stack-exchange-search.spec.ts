import {fakeAsync, flush, TestBed} from '@angular/core/testing';

import {MockXxxEventMgrService} from '../../library/xxx-event-mgr/mock-xxx-event-mgr.service';
import {MockXxxStateStoreService} from '../../library/xxx-state-store/mock-xxx-state-store.service';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxMessage} from '../../library/xxx-message/xxx-message';
import {XxxMessageService} from '../../library/xxx-message/xxx-message.service';
import {XxxStackExchangeSearchService} from './xxx-stack-exchange-search.service';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

describe('XxxStackExchangeSearchService', () => {
  let spyEventMgrHandleEvent: jasmine.Spy;
  let spyStateStoreGetItem: jasmine.Spy;
  let spyStateStorePutItem: jasmine.Spy;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxMessageService: XxxMessageService;
  let xxxStackExchangeSearchService: XxxStackExchangeSearchService;
  let xxxStateStoreService: XxxStateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: XxxEventMgrService, useClass: MockXxxEventMgrService},
        XxxMessageService,
        XxxStackExchangeSearchService,
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService}
      ]
    });
  });

  beforeEach(() => {
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    xxxMessageService = TestBed.get(XxxMessageService);
    xxxStackExchangeSearchService = TestBed.get(XxxStackExchangeSearchService);
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyEventMgrHandleEvent = spyOn(xxxEventMgrService, 'handleEvent');
    // state store needs to return different value each time for these tests
    spyStateStoreGetItem = spyOn(xxxStateStoreService, 'getItem').and.returnValue(Math.random().toString());
    spyStateStorePutItem = spyOn(xxxStateStoreService, 'putItem');
  });

  it('should create service', () => {
    expect(xxxStackExchangeSearchService).toBeDefined();
  });

  it('should run state store and event mgr services when message broadcasts search text change', fakeAsync(() => {
    const mockMessage = new XxxMessage('searchTextChange');
    xxxMessageService.broadcast(mockMessage);
    flush();
    expect(spyStateStoreGetItem).toHaveBeenCalled();
    expect(spyStateStorePutItem).toHaveBeenCalled();
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
  }));
});
