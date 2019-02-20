import {NgModule} from '@angular/core';

import {XxxDataResponseInterceptor} from './xxx-data-response-interceptor.service';
import {XxxMessageModule} from '../../library';

@NgModule({
  imports: [XxxMessageModule],
  providers: [XxxDataResponseInterceptor]
})

export class XxxDataResponseInterceptorModule {
}
