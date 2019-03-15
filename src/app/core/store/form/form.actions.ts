import { Action } from '@ngrx/store';
import { KeyModel } from '../../models/key.model';
import { ServiceModel } from '../../models/service.model';

export const ADD_AUTHENTICATION_KEY = '[FORM] ADD_AUTHENTICATION_KEY';
export const ADD_PUBLIC_KEY = '[FORM] ADD_PUBLIC_KEY';
export const ADD_SERVICE = '[FORM] ADD_SERVICE';
export const REMOVE_AUTHENTICATION_KEY = '[FORM] REMOVE_AUTHENTICATION_KEY';
export const REMOVE_PUBLIC_KEY = '[FORM] REMOVE_PUBLIC_KEY';
export const REMOVE_SERVICE = '[FORM] REMOVE_SERVICE';

export class AddAuthenticationKey implements Action {
  readonly type: string = ADD_AUTHENTICATION_KEY;

  constructor (public payload: KeyModel) { }
}

export class AddPublicKey implements Action {
  readonly type: string = ADD_PUBLIC_KEY;

  constructor (public payload: KeyModel) { }
}

export class AddService implements Action {
  readonly type: string = ADD_SERVICE;

  constructor (public payload: ServiceModel) { }
}

export class RemoveAuthenticationKey implements Action {
  readonly type: string = REMOVE_AUTHENTICATION_KEY;

  constructor (public payload: KeyModel) { }
}

export class RemovePublicKey implements Action {
  readonly type: string = REMOVE_PUBLIC_KEY;

  constructor (public payload: KeyModel) { }
}

export class RemoveService implements Action {
  readonly type: string = REMOVE_SERVICE;

  constructor (public payload: ServiceModel) { }
}
