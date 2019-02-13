import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {MockXxxDataService} from '../xxx-data/mock-xxx-data.service';
import {MockXxxStateStoreService} from '../xxx-state-store/mock-xxx-state-store.service';
import {XxxDataService} from '../xxx-data/xxx-data.service';
import {XxxEventMgrService} from './xxx-event-mgr.service';
import {XxxMessageService} from '../xxx-message/xxx-message.service';
import {XxxStateStoreService} from '../xxx-state-store/xxx-state-store.service';

describe('XxxEventMgrService', () => {
  let mockEventConfigs: any;
  let router: Router;
  let spyDataServiceGetData: jasmine.Spy;
  let spyEventMgrHandleEvent: jasmine.Spy;
  let spyMessageServiceBroadcast: jasmine.Spy;
  let spyRouterNavigate: jasmine.Spy;
  let spyStateStoreGetItem: jasmine.Spy;
  let xxxDataService: XxxDataService;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxMessageService: XxxMessageService;
  let xxxStateStoreService: XxxStateStoreService;

  mockEventConfigs = {
    eventConfigs: [
      {
        eventId: 'eventBroadcast',
        eventActions: [
          {
            action: 'broadcast',
            actionKey: 'key-broadcast'
          }
        ]
      },
      {
        eventId: 'eventBroadcastData',
        eventActions: [
          {
            action: 'broadcast',
            actionKey: 'key-broadcast-data',
            actionData: 'test data'
          }
        ]
      },
      {
        eventId: 'eventRoute',
        eventActions: [
          {
            action: 'route',
            actionKey: 'key-route'
          }
        ]
      },
      {
        eventId: 'eventBroadcastAndRoute',
        eventActions: [
          {
            action: 'broadcast',
            actionKey: 'key-broadcast-2'
          },
          {
            action: 'route',
            actionKey: 'key-route-2'
          }
        ]
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: XxxDataService, useClass: MockXxxDataService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService},
        XxxEventMgrService,
        XxxMessageService
      ]
    });
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    xxxDataService = TestBed.get(XxxDataService);
    xxxMessageService = TestBed.get(XxxMessageService);
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyDataServiceGetData = spyOn(xxxDataService, 'getData').and.callThrough();
    spyMessageServiceBroadcast = spyOn(xxxMessageService, 'broadcast');
    spyRouterNavigate = spyOn(router, 'navigate');
    spyStateStoreGetItem = spyOn(xxxStateStoreService, 'getItem').and.callThrough();
  });

  function createService() {
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrHandleEvent = spyOn(xxxEventMgrService, 'handleEvent').and.callThrough();
  }

  it('should be created', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    expect(xxxEventMgrService).toBeDefined();
  }));

  it('should run getData with success', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    expect(spyDataServiceGetData).toHaveBeenCalled();
  }));

  it('should run handleEvent with eventId not found', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('badEventId');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
  }));

  it('should run handleEvent broadcast', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcast');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).toHaveBeenCalled();
    const args = spyMessageServiceBroadcast.calls.mostRecent().args;
    const messageKey = args[0].key;
    expect(messageKey).toBe('key-broadcast');
  }));

  it('should run handleEvent broadcast with data', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcastData');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).toHaveBeenCalled();
    const args = spyMessageServiceBroadcast.calls.mostRecent().args;
    const messageKey = args[0].key;
    const messagePayload = args[0].payload;
    expect(messageKey).toBe('key-broadcast-data');
    expect(messagePayload).toBe('test data');
  }));

  it('should run handleEvent route', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventRoute');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['stateValue']);
  }));

  it('should run handleEvent broadcast and route', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcastAndRoute');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).toHaveBeenCalled();
    const args = spyMessageServiceBroadcast.calls.mostRecent().args;
    const messageKey = args[0].key;
    expect(messageKey).toBe('key-broadcast-2');
    expect(router.navigate).toHaveBeenCalledWith(['stateValue']);
  }));

  it('should run getData with failure', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.reject(''));
    createService();
    tick();
    expect(spyDataServiceGetData).toHaveBeenCalled();
  }));

  it('should run handleEvent with no event data failure', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(Promise.resolve({}));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcast');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
  }));
});
