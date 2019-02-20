import {ErrorHandler, NgModule} from '@angular/core';

import {XxxAlertModule, XxxLogModule} from '../../library';
import {XxxErrorHandler} from './xxx-error-handler.service';

@NgModule({
  imports: [
    XxxAlertModule,
    XxxLogModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: XxxErrorHandler},
    XxxErrorHandler
  ]
})
export class XxxErrorHandlerModule {
}
