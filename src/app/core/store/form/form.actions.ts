import { Action } from '@ngrx/store';
import { KeyModel } from '../../models/key.model';
import { ServiceModel } from '../../models/service.model';

export const ADD_AUTHENTICATION_KEYS = '[FORM] ADD_AUTHENTICATION_KEYS';
export const ADD_PUBLIC_KEY = '[FORM] ADD_PUBLIC_KEY';
export const ADD_SERVICES = '[FORM] ADD_SERVICES';
export const REMOVE_PUBLIC_KEY = '[FORM] REMOVE_PUBLIC_KEY';

export class AddAuthenticationKeys implements Action {
  readonly type: string = ADD_AUTHENTICATION_KEYS;

  constructor (public payload: KeyModel[]) { }
}

export class AddPublicKey implements Action {
  readonly type: string = ADD_PUBLIC_KEY;

  constructor (public payload: KeyModel) { }
}

export class AddServices implements Action {
  readonly type: string = ADD_SERVICES;

  constructor (public payload: ServiceModel[]) { }
}

export class RemovePublicKey implements Action {
  readonly type: string = REMOVE_PUBLIC_KEY;

  constructor (public payload: KeyModel) { }
}
