import {of} from 'rxjs';

export const mockRouteParamId = 'id123';

export class MockActivatedRoute {
  params = of({id: mockRouteParamId});
}
