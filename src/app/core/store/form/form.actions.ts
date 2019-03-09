import { Action } from '@ngrx/store';
import { ServiceModel } from '../../models/service.model';

export const ADD_SERVICES = '[FORM] ADD_SERVICES';

export class AddServices implements Action {
  readonly type: string = ADD_SERVICES;

  constructor (public payload: ServiceModel[]) { }
}
