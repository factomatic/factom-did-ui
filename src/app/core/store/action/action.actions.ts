import { Action } from '@ngrx/store';

export const SELECT_ACTION = '[ACTION] SELECT_ACTION';

export class SelectAction implements Action {
  readonly type: string = SELECT_ACTION;

  constructor (public payload: string) { }
}
