import { Action } from '@ngrx/store';

export const COMPLETE_STEP = '[ACTION] COMPLETE_STEP';
export const SELECT_ACTION = '[ACTION] SELECT_ACTION';

export class SelectAction implements Action {
  readonly type: string = SELECT_ACTION;

  constructor (public payload: string) { }
}

export class CompleteStep implements Action {
  readonly type: string = COMPLETE_STEP;

  constructor (public payload: number) { }
}
