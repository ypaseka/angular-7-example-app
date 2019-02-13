import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {MockActivatedRoute, mockRouteParamId} from '../../../mocks/angular/mock-activated-route';
import {MockXxxAlertService} from '../../library/xxx-alert/mock-xxx-alert.service';
import {MockXxxDataService} from '../../library/xxx-data/mock-xxx-data.service';
import {MockXxxEventMgrService} from '../../library/xxx-event-mgr/mock-xxx-event-mgr.service';
import {MockXxxStateStoreService} from '../../library/xxx-state-store/mock-xxx-state-store.service';
import {XxxAlertService} from '../../library/xxx-alert/xxx-alert.service';
import {XxxDataService} from '../../library/xxx-data/xxx-data.service';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';
import {XxxStackExchangeQuestionsComponent} from './xxx-stack-exchange-questions.component';

describe('XxxStackExchangeQuestionsComponent', () => {
  let component: XxxStackExchangeQuestionsComponent;
  let fixture: ComponentFixture<XxxStackExchangeQuestionsComponent>;
  let spyAlertService: jasmine.Spy;
  let spyDataService: jasmine.Spy;
  let spyEventMgrService: jasmine.Spy;
  let spyStateStoreService: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxDataService: XxxDataService;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxStateStoreService: XxxStateStoreService;

  const mockQuestionData = {
    items: [
      {question_id: 'Q123'}
    ]
  };

  function createComponent() {
    fixture = TestBed.createComponent(XxxStackExchangeQuestionsComponent);
    component = fixture.componentInstance;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxStackExchangeQuestionsComponent],
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
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
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
    spyStateStoreService = spyOn(xxxStateStoreService, 'putItem');
  });

  it('should create', fakeAsync(() => {
    createComponent();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should get the search text from the route url id', fakeAsync(() => {
    createComponent();
    flush();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes(mockRouteParamId);
    expect(isUrlCorrect).toBeTruthy();
  }));

  it('should run goToFirstPage', fakeAsync(() => {
    createComponent();
    component.goToFirstPage();
    flush();
    expect(spyDataService).toHaveBeenCalled();
  }));

  it('should run goToNextPage', fakeAsync(() => {
    createComponent();
    component.goToNextPage();
    flush();
    expect(spyDataService).toHaveBeenCalled();
  }));

  it('should run goToPreviousPage', fakeAsync(() => {
    createComponent();
    component.goToPreviousPage();
    flush();
    expect(spyDataService).toHaveBeenCalled();
  }));

  it('should handle success on get questions not empty', fakeAsync(() => {
    spyDataService.and.returnValue(Promise.resolve(mockQuestionData));
    createComponent();
    component.goToNextPage();
    flush();
    expect(component.isResult).toBeTruthy();
    expect(component.isError).toBeFalsy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should run alert service with warning when questions are empty', fakeAsync(() => {
    let alertType: string;
    spyDataService.and.returnValue(Promise.resolve({}));
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertType = type;
    });
    createComponent();
    component.goToNextPage();
    flush();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe('warn');
  }));

  it('should set flags when questions data rejects on error', fakeAsync(() => {
    spyDataService.and.returnValue(Promise.reject({}));
    createComponent();
    component.goToNextPage();
    flush();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should decode html entities', fakeAsync(() => {
    createComponent();
    flush();
    const result = component.decodeHtmlEntities('&#62;');
    expect(result).toBe('>');
  }));

  it('should run questionOnClick', fakeAsync(() => {
    createComponent();
    component.questionOnClick('xyz');
    flush();
    expect(spyStateStoreService).toHaveBeenCalled();
    const url: string = spyStateStoreService.calls.mostRecent().args[1];
    const isUrlCorrect = url.includes('xyz');
    expect(isUrlCorrect).toBeTruthy();
    expect(spyEventMgrService).toHaveBeenCalled();
  }));
});
