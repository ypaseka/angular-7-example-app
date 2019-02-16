import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {environment} from '../../../environments/environment';
import {XxxEventMgrService} from '../../library/xxx-event-mgr/xxx-event-mgr.service';
import {XxxEventRoute} from '../../library/xxx-event-mgr/xxx-event.interface';
import {XxxMessageService} from '../../library/xxx-message/xxx-message.service';
import {XxxStateStoreService} from '../../library/xxx-state-store/xxx-state-store.service';

/**
 * Subscribes to message from search box, routes to stack exchange questions view
 */
@Injectable()
export class XxxStackExchangeSearchService {
  private searchText = '';
  private subscriptionSearchTextChange: Subscription;

  constructor(
      private xxxEventMgrService: XxxEventMgrService,
      private xxxMessageService: XxxMessageService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages() {
    this.subscriptionSearchTextChange = this.xxxMessageService.subscribe('searchTextChange', () => {
      this.onSearchTextChange();
    });
  }

  private onSearchTextChange() {
    const searchText = this.xxxStateStoreService.getItem('searchText');
    if ((typeof searchText === 'string') && (searchText.length) && (searchText !== this.searchText)) {
      const encodedSearchText = encodeURI(searchText);
      const eventRoute: XxxEventRoute = {
        url: [environment.url.questions],
        queryParams: {
          title: encodedSearchText
        }
      };
      this.xxxStateStoreService.putItem('questionsRoute', eventRoute);
      this.xxxEventMgrService.handleEvent('questionsSearchRoute');
    }
  }
}
