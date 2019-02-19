import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';

import {MockActivatedRouteWithId, mockRouteParamId} from '../../../mocks/angular/mock-activated-route';
import {MockXxxAlertService} from '../../library/xxx-alert/mock-xxx-alert.service';
import {MockXxxDataService} from '../../library/xxx-data/mock-xxx-data.service';
import {MockXxxEventMgrService} from '../../library/xxx-event-mgr/mock-xxx-event-mgr.service';
import {MockXxxStateStoreService} from '../../library/xxx-state-store/mock-xxx-state-store.service';
import {XxxAlertService} from '../../library/xxx-alert/xxx-alert.service';
import {XxxDataService} from '../../library/xxx-data/xxx-data.service';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxStackExchangeAnswersComponent} from './xxx-stack-exchange-answers.component';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

describe('XxxStackExchangeAnswersComponent', () => {
  let component: XxxStackExchangeAnswersComponent;
  let fixture: ComponentFixture<XxxStackExchangeAnswersComponent>;
  let route: ActivatedRoute;
  let spyAlertService: jasmine.Spy;
  let spyDataService: jasmine.Spy;
  let spyEventMgrService: jasmine.Spy;
  let spyStateStoreGetItem: jasmine.Spy;
  let spyStateStorePutItem: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxDataService: XxxDataService;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxStateStoreService: XxxStateStoreService;

  const mockQuestionData = {
    items: [
      {question_id: 'Q123'}
    ]
  };

  const mockAnswersData = {
    items: [
      {answer_id: 'A123'}
    ]
  };

  function createComponent() {
    fixture = TestBed.createComponent(XxxStackExchangeAnswersComponent);
    component = fixture.componentInstance;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxStackExchangeAnswersComponent],
      imports: [
        FlexLayoutModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRouteWithId},
        {provide: XxxAlertService, useClass: MockXxxAlertService},
        {provide: XxxDataService, useClass: MockXxxDataService},
        {provide: XxxEventMgrService, useClass: MockXxxEventMgrService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    xxxAlertService = TestBed.get(XxxAlertService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    xxxDataService = TestBed.get(XxxDataService);
    spyDataService = spyOn(xxxDataService, 'getData').and.callThrough();
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrService = spyOn(xxxEventMgrService, 'handleEvent');
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyStateStoreGetItem = spyOn(xxxStateStoreService, 'getItem');
    spyStateStorePutItem = spyOn(xxxStateStoreService, 'putItem');
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', fakeAsync(() => {
    createComponent();
    tick();
    expect(component).toBeTruthy();
  }));

  it('should get the question id from the route url id', fakeAsync(() => {
    createComponent();
    tick();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes(mockRouteParamId);
    expect(isUrlCorrect).toBeTruthy();
  }));

  it('should handle missing question id from the route url id', fakeAsync(() => {
    route.params = of({});
    createComponent();
    tick();
    expect(spyDataService).not.toHaveBeenCalled();
  }));

  it('should run get question and get answers with success', fakeAsync(() => {
    spyDataService.and.callFake((url: string) => {
      if (url.includes('answers')) {
        return Promise.resolve(mockAnswersData);
      } else {
        return Promise.resolve(mockQuestionData);
      }
    });
    createComponent();
    tick();
    expect(component.isResult).toBeTruthy();
    expect(component.isError).toBeFalsy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should run alert service with warning when question is empty', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    spyDataService.and.returnValue(Promise.resolve({}));
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertType = type;
      alertMessage = msg;
    });
    createComponent();
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe('warn');
    expect(alertMessage).toBe('Given Question Id Not Found');
  }));

  it('should run alert service with warning when answers are empty', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    spyDataService.and.callFake((url: string) => {
      if (url.includes('answers')) {
        return Promise.resolve({});
      } else {
        return Promise.resolve(mockQuestionData);
      }
    });
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertType = type;
      alertMessage = msg;
    });
    createComponent();
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe('warn');
    expect(alertMessage).toBe('No Answers Found For Given Question Id');
  }));

  it('should set flags when get question data rejects on error', fakeAsync(() => {
    spyDataService.and.callFake((url: string) => {
      if (url.includes('answers')) {
        return Promise.resolve(mockAnswersData);
      } else {
        return Promise.reject('');
      }
    });
    createComponent();
    tick();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should set flags when get answers data rejects on error', fakeAsync(() => {
    spyDataService.and.callFake((url: string) => {
      if (url.includes('answers')) {
        return Promise.reject('');
      } else {
        return Promise.resolve(mockAnswersData);
      }
    });
    createComponent();
    tick();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should decode html entities', fakeAsync(() => {
    let result: string;
    createComponent();
    tick();
    result = component.decodeHtmlEntities('&#62;');
    expect(result).toBe('>');
  }));

  it('should run onClickBackToQuestions', fakeAsync(() => {
    createComponent();
    tick();
    component.onClickBackToQuestions();
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeQuestions');
  }));

  it('should run checkForQuestions on create with no value', fakeAsync(() => {
    createComponent();
    tick();
    expect(spyStateStoreGetItem).toHaveBeenCalled();
    const stateKey = spyStateStoreGetItem.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    expect(component.isQuestions).toBeFalsy();
  }));

  it('should run checkForQuestions on create with value', fakeAsync(() => {
    spyStateStoreGetItem.and.returnValue('x');
    createComponent();
    tick();
    expect(spyStateStoreGetItem).toHaveBeenCalled();
    const stateKey = spyStateStoreGetItem.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    expect(component.isQuestions).toBeTruthy();
  }));
});
