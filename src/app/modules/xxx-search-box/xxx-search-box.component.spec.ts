import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {By} from '@angular/platform-browser';

import {MockXxxEventMgrService} from '../../library/xxx-event-mgr/mock-xxx-event-mgr.service';
import {MockXxxStateStoreService} from '../../library/xxx-state-store/mock-xxx-state-store.service';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxSearchBoxComponent} from './xxx-search-box.component';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

describe('XxxSearchBoxComponent', () => {
  let buttonElement: HTMLButtonElement;
  let component: XxxSearchBoxComponent;
  let fixture: ComponentFixture<XxxSearchBoxComponent>;
  let spyEventMgrService: jasmine.Spy;
  let spyStateStoreService: jasmine.Spy;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxStateStoreService: XxxStateStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxSearchBoxComponent],
      imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        {provide: XxxEventMgrService, useClass: MockXxxEventMgrService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    let buttonDebugElement: DebugElement;

    fixture = TestBed.createComponent(XxxSearchBoxComponent);
    component = fixture.componentInstance;
    buttonDebugElement = fixture.debugElement.query(By.css('button'));
    buttonElement = buttonDebugElement.nativeElement as HTMLButtonElement;
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrService = spyOn(xxxEventMgrService, 'handleEvent');
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyStateStoreService = spyOn(xxxStateStoreService, 'putItem');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run event mgr service on click', () => {
    buttonElement.click();
    expect(spyEventMgrService).toHaveBeenCalled();
  });

  it('should run state store service on click', () => {
    buttonElement.click();
    expect(spyStateStoreService).toHaveBeenCalled();
  });
});
