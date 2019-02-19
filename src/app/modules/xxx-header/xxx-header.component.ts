import {Component} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'xxx-header',
  styleUrls: ['./xxx-header.component.scss'],
  templateUrl: './xxx-header.component.html'
})

export class XxxHeaderComponent {
  constructor(public mediaObserver: MediaObserver) {
  }
}
