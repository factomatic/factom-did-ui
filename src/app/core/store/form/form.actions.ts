import { Action } from '@ngrx/store';
import { KeyModel } from '../../models/key.model';
import { ServiceModel } from '../../models/service.model';

export const ADD_PUBLIC_KEYS = '[FORM] ADD_PUBLIC_KEYS';
export const ADD_SERVICES = '[FORM] ADD_SERVICES';

export class AddPublicKeys implements Action {
  readonly type: string = ADD_PUBLIC_KEYS;

  constructor (public payload: KeyModel[]) { }
}

export class AddServices implements Action {
  readonly type: string = ADD_SERVICES;

  constructor (public payload: ServiceModel[]) { }
}
