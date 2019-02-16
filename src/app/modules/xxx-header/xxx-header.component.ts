import {Component, OnDestroy} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'xxx-header',
  styleUrls: ['./xxx-header.component.scss'],
  templateUrl: './xxx-header.component.html'
})

export class XxxHeaderComponent implements OnDestroy {
  isMobileView: boolean;
  private subscriptionMediaChange: Subscription;

  constructor(public mediaObserver: MediaObserver) {
    this.subscribeToMediaChange();
  }

  subscribeToMediaChange() {
    const media$ = this.mediaObserver.asObservable().pipe(
        filter((changes: MediaChange[]) => true)   // silly noop filter
    );
    this.subscriptionMediaChange = media$.subscribe((changes: MediaChange[]) => {
      let isFound = false;
      changes.forEach(change => {
        if (!isFound) {
          isFound = (change.mqAlias === 'xs');
        }
      });
      this.isMobileView = isFound;
    });
  }

  ngOnDestroy() {
    this.subscriptionMediaChange.unsubscribe();
  }
}
