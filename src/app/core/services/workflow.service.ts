import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';

@Injectable()
export class WorkflowService {
  private selectedAction: string;

  constructor (private store: Store<AppState>) {
    this.store.pipe(select(state => state.action))
      .subscribe(action => {
        this.selectedAction = action.selectedAction;
      });
  }

  getSelectedAction(): string {
    return this.selectedAction;
  }
}
