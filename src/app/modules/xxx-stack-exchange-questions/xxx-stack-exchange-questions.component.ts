import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {environment} from '../../../environments/environment';
import {XxxAlertService} from '../../library/xxx-alert/xxx-alert.service';
import {XxxAlertType} from '../../library/xxx-alert/xxx-alert.enum';
import {XxxDataService} from '../../library/xxx-data/xxx-data.service';
import {XxxEventRoute} from '../../library/xxx-event-mgr/xxx-event.interface';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

@Component({
  selector: 'xxx-stack-exchange-questions',
  styleUrls: ['./xxx-stack-exchange-questions.component.scss'],
  templateUrl: './xxx-stack-exchange-questions.component.html'
})

export class XxxStackExchangeQuestionsComponent implements OnDestroy {
  pageNumber: number = null;
  isMorePages = false;
  isBusy = false;
  isError = false;
  isResult = false;
  questions: any = [];
  private apiKey = 'U4DMV*8nvpm3EOpvf69Rxw((';
  private searchText: string = null;
  private subscriptionRouteParam: Subscription;

  constructor(
      private route: ActivatedRoute,
      private xxxAlertService: XxxAlertService,
      private xxxDataService: XxxDataService,
      private xxxEventMgrService: XxxEventMgrService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
    this.subscribeToRouteParams();
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
    const eventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: this.searchText
      }
    };
    this.xxxStateStoreService.putItem('questionsRoute', eventRoute);
    this.xxxEventMgrService.handleEvent('routeQuestions');
  }

  goToPreviousPage() {
    const eventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: this.searchText,
        page: (this.pageNumber > 2) ? this.pageNumber - 1 : null
      }
    };
    this.xxxStateStoreService.putItem('questionsRoute', eventRoute);
    this.xxxEventMgrService.handleEvent('routeQuestions');
  }

  goToNextPage() {
    const eventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: this.searchText,
        page: this.pageNumber + 1
      }
    };
    this.xxxStateStoreService.putItem('questionsRoute', eventRoute);
    this.xxxEventMgrService.handleEvent('routeQuestions');
  }

  questionOnClick(questionId) {
    const eventRoute: XxxEventRoute = {
      url: [environment.url.answers + '/' + questionId]
    };
    this.xxxStateStoreService.putItem('answersRoute', eventRoute);
    this.xxxEventMgrService.handleEvent('routeAnswers');
  }

  private subscribeToRouteParams() {
    this.subscriptionRouteParam = this.route.queryParams.subscribe(params => {
      const searchText = params['title'] || '';
      const pageNumber = +params['page'] || 1;
      if ((typeof searchText === 'string') && (searchText.length > 0)) {
        this.processSearchQuery(searchText, pageNumber);
      } else {
        this.xxxAlertService.openAlert(XxxAlertType.WARN, 'Title missing. Try a new search.');
      }
    });
  }

  private processSearchQuery(searchText: string, pageNumber: number) {
    let isChanged = false;
    if (searchText !== this.searchText) {
      this.searchText = searchText;
      isChanged = true;
    }
    if (pageNumber !== this.pageNumber) {
      this.pageNumber = pageNumber;
      isChanged = true;
    }
    if (isChanged) {
      this.getQuestions();
    }
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
    url += '&page=' + this.pageNumber.toString();
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
      this.xxxAlertService.openAlert(XxxAlertType.WARN, warningMsg);
    }
    this.isMorePages = ((result.hasOwnProperty('has_more'))
        && (typeof result.has_more === 'boolean')
        && (result.has_more));
    this.searchDone();
  }

  // Errors are handled by global interceptor.
  private onErrorGetQuestions(result) {
    this.isBusy = false;
    this.isError = true;
    this.searchDone();
  }

  private searchDone() {
    this.xxxEventMgrService.handleEvent('questionsSearchDone');
  }
}
