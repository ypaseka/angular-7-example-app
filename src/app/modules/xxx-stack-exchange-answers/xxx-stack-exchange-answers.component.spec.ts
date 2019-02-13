import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

import {MockActivatedRoute, mockRouteParamId} from '../../../mocks/angular/mock-activated-route';
import {MockXxxAlertService} from '../../library/xxx-alert/mock-xxx-alert.service';
import {MockXxxDataService} from '../../library/xxx-data/mock-xxx-data.service';
import {XxxAlertService} from '../../library/xxx-alert/xxx-alert.service';
import {XxxDataService} from '../../library/xxx-data/xxx-data.service';
import {XxxStackExchangeAnswersComponent} from './xxx-stack-exchange-answers.component';

describe('XxxStackExchangeAnswersComponent', () => {
  let component: XxxStackExchangeAnswersComponent;
  let fixture: ComponentFixture<XxxStackExchangeAnswersComponent>;
  let spyAlertService: jasmine.Spy;
  let spyDataService: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxDataService: XxxDataService;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxStackExchangeAnswersComponent],
      imports: [
        FlexLayoutModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: XxxAlertService, useClass: MockXxxAlertService},
        {provide: XxxDataService, useClass: MockXxxDataService},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    xxxDataService = TestBed.get(XxxDataService);
    spyDataService = spyOn(xxxDataService, 'getData').and.callThrough();
    xxxAlertService = TestBed.get(XxxAlertService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
  });

  function createComponent() {
    fixture = TestBed.createComponent(XxxStackExchangeAnswersComponent);
    component = fixture.componentInstance;
  }

  it('should create', fakeAsync(() => {
    createComponent();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should get the question id from the route url id', fakeAsync(() => {
    createComponent();
    flush();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes(mockRouteParamId);
    expect(isUrlCorrect).toBeTruthy();
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
    flush();
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
    flush();
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
    flush();
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
    flush();
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
    flush();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should decode html entities', fakeAsync(() => {
    let result: string;
    createComponent();
    flush();
    result = component.decodeHtmlEntities('&#62;');
    expect(result).toBe('>');
  }));
});