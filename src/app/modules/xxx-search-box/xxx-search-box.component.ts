import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {
  XxxEventMgrService,
  XxxMessageService,
  XxxStateStoreService
} from '../../library';

@Component({
  selector: 'xxx-search-box',
  templateUrl: './xxx-search-box.component.html',
  styleUrls: ['./xxx-search-box.component.scss']
})

export class XxxSearchBoxComponent implements OnDestroy {
  isButtonDisabled = false;
  searchText: string;
  subscriptionButtonEnable: Subscription;
  private lastSearchText: string = null;

  constructor(
      private xxxEventMgrService: XxxEventMgrService,
      private xxxMessageService: XxxMessageService,
      private xxxStateStoreService: XxxStateStoreService
  ) {
    this.subscribeToMessages();
  }

  onSearchClick() {
    this.lastSearchText = this.searchText;
    this.isButtonDisabled = true;
    this.xxxStateStoreService.putItem('searchText', this.searchText);
    this.xxxEventMgrService.handleEvent('searchBox.search');
  }

  isSearchTextChanged(): boolean {
    return this.searchText !== this.lastSearchText;
  }

  ngOnDestroy(): void {
    this.subscriptionButtonEnable.unsubscribe();
  }

  private subscribeToMessages() {
    this.subscriptionButtonEnable = this.xxxMessageService.subscribe('searchButtonEnable', () => {
      this.isButtonDisabled = false;
    });
  }
}
