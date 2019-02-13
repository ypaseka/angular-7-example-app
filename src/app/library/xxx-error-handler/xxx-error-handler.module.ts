import {ErrorHandler, NgModule} from '@angular/core';

import {XxxAlertModule} from '../xxx-alert/xxx-alert.module';
import {XxxErrorHandler} from './xxx-error-handler.service';
import {XxxLogModule} from '../xxx-log/xxx-log.module';

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
