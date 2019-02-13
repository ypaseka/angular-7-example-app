import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {environment} from '../../../environments/environment';
import {XxxAlertService} from '../../library/xxx-alert/xxx-alert.service';
import {XxxDataService} from '../../library/xxx-data/xxx-data.service';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

@Component({
  selector: 'xxx-stack-exchange-questions',
  styleUrls: ['./xxx-stack-exchange-questions.component.scss'],
  templateUrl: './xxx-stack-exchange-questions.component.html'
})

export class XxxStackExchangeQuestionsComponent implements OnDestroy {
  currentPage = 1;
  isMorePages = false;
  isBusy = false;
  isError = false;
  isResult = false;
  questions: any = [];
  private apiKey = 'U4DMV*8nvpm3EOpvf69Rxw((';
  private requestedPage = 1;
  private searchText: string;
  private subscriptionRouteParam: Subscription;

  constructor(
      private route: ActivatedRoute,
      private xxxAlertService: XxxAlertService,
      private xxxDataService: XxxDataService,
      private xxxEventMgrService: XxxEventMgrService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
    this.requestedPage = 1;
    this.getSearchText();
  }

  ngOnDestroy() {
    this.subscriptionRouteParam.unsubscribe();
  }

  decodeHtmlEntities(text) {
    return text.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }

  goToFirstPage() {
    this.requestedPage = 1;
    this.getQuestions();
  }

  goToPreviousPage() {
    this.requestedPage = --this.currentPage;
    this.getQuestions();
  }

  goToNextPage() {
    this.requestedPage = ++this.currentPage;
    this.getQuestions();
  }

  questionOnClick(questionId) {
    let url = environment.url.answers;
    url += questionId;
    this.xxxStateStoreService.putItem('answersRoute', url);
    this.xxxEventMgrService.handleEvent('answersRoute');
  }

  private getSearchText() {
    this.subscriptionRouteParam = this.route.params.subscribe(params => {
      this.searchText = params['id'];
      if ((typeof this.searchText === 'string') && (this.searchText.length > 0)) {
        this.getQuestions();
      }
    });
  }

  private getQuestions() {
    this.isBusy = true;
    this.isResult = false;
    this.isError = false;
    let url = environment.url.api;
    url += 'search/advanced';
    url += '?key=' + this.apiKey;
    url += '&title=' + encodeURI(this.searchText);
    url += '&answers=1';
    url += '&site=stackoverflow';
    url += '&filter=withbody';
    url += '&page=' + this.requestedPage.toString();
    url += '&order=desc';
    url += '&sort=votes';
    this.xxxDataService.getData(url)
        .then(result => this.onSuccessGetQuestions(result),
            result => this.onErrorGetQuestions(result));
  }

  private onSuccessGetQuestions(result) {
    this.isBusy = false;
    if ((result.hasOwnProperty('items'))
        && (typeof result.items === 'object')
        && (result.items.length > 0)) {
      this.questions = result.items;
      this.isResult = true;
    } else {
      const warningMsg = 'No Results Found';
      this.xxxAlertService.openAlert('warn', warningMsg);
    }
    this.isMorePages = ((result.hasOwnProperty('has_more'))
        && (typeof result.has_more === 'boolean')
        && (result.has_more));
    this.currentPage = this.requestedPage;
  }

  // Errors are handled by global interceptor.
  private onErrorGetQuestions(result) {
    this.isBusy = false;
    this.isError = true;
  }
}
