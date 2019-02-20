import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {XxxDataResponseInterceptor} from '../../library';
import {XxxDataService} from './xxx-data.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    XxxDataService,
    {provide: HTTP_INTERCEPTORS, useClass: XxxDataResponseInterceptor, multi: true}
  ]
})

export class XxxDataModule {
}
