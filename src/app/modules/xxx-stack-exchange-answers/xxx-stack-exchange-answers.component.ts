import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {environment} from '../../../environments/environment';
import {XxxAlertService} from '../../library/xxx-alert/xxx-alert.service';
import {XxxAlertType} from '../../library/xxx-alert/xxx-alert.enum';
import {XxxDataService} from '../../library/xxx-data/xxx-data.service';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

@Component({
  selector: 'xxx-stack-exchange-answers',
  styleUrls: ['./xxx-stack-exchange-answers.component.scss'],
  templateUrl: './xxx-stack-exchange-answers.component.html'
})

export class XxxStackExchangeAnswersComponent implements OnDestroy {
  answers: any = [];
  isBusy = false;
  isError = false;
  isQuestions = false;
  isResult = false;
  question: any = {};
  private apiKey = 'U4DMV*8nvpm3EOpvf69Rxw((';
  private questionId: string;
  private subscriptionRouteParam: Subscription;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private xxxAlertService: XxxAlertService,
      private xxxDataService: XxxDataService,
      private xxxEventMgrService: XxxEventMgrService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
    this.checkForQuestions();
    this.getQuestionId();
  }

  ngOnDestroy() {
    this.subscriptionRouteParam.unsubscribe();
  }

  decodeHtmlEntities(text) {
    return text.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }

  onClickBackToQuestions() {
    this.xxxEventMgrService.handleEvent('routeQuestions');
  }

  private checkForQuestions() {
    if (this.xxxStateStoreService.getItem('questionsRoute')) {
      this.isQuestions = true;
    }
  }

  private getQuestionId() {
    this.questionId = '';
    this.subscriptionRouteParam = this.route.params.subscribe(params => {
      this.questionId = params['id'];
      if ((typeof this.questionId === 'string') && (this.questionId.length > 0)) {
        this.getQuestion();
      }
    });
  }

  private getQuestion() {
    this.isBusy = true;
    this.isResult = false;
    this.isError = false;
    let url = environment.url.api;
    url += 'questions/';
    url += this.questionId;
    url += '?key=' + this.apiKey;
    url += '&order=desc';
    url += '&sort=activity';
    url += '&site=stackoverflow';
    this.xxxDataService.getData(url)
        .then(result => this.onSuccessGetQuestion(result),
            result => this.onErrorGetQuestion(result));
  }

  private onSuccessGetQuestion(result) {
    if ((result.hasOwnProperty('items'))
        && (typeof result.items === 'object')
        && (result.items.length > 0)) {
      this.question = result.items[0];
      this.getAnswers();
    } else {
      const warningMsg = 'Given Question Id Not Found';
      this.xxxAlertService.openAlert(XxxAlertType.WARN, warningMsg);
    }
  }

  // Errors are handled by global interceptor.
  private onErrorGetQuestion(result) {
    this.isBusy = false;
    this.isError = true;
  }

  private getAnswers() {
    this.isBusy = true;
    this.isResult = false;
    this.isError = false;
    this.answers = [];
    let url = environment.url.api;
    url += 'questions/';
    url += this.questionId;
    url += '/answers';
    url += '?key=' + this.apiKey;
    url += '&site=stackoverflow';
    url += '&order=desc';
    url += '&sort=votes';
    url += '&filter=withbody';
    this.xxxDataService.getData(url)
        .then(result => this.onSuccessGetAnswers(result),
            result => this.onErrorGetAnswers(result));
  }

  private onSuccessGetAnswers(result) {
    this.isBusy = false;
    if ((result.hasOwnProperty('items'))
        && (typeof result.items === 'object')
        && (result.items.length > 0)) {
      this.answers = result.items;
      this.isResult = true;
    } else {
      const warningMsg = 'No Answers Found For Given Question Id';
      this.xxxAlertService.openAlert(XxxAlertType.WARN, warningMsg);
    }
  }

  // Errors are handled by global interceptor.
  private onErrorGetAnswers(result) {
    this.isBusy = false;
    this.isError = true;
  }
}
