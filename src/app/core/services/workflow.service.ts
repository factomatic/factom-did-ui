import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';

@Injectable()
export class WorkflowService {
  private selectedAction: string;
  private currentStepIndex: number;

  constructor (private store: Store<AppState>) {
    this.store.pipe(select(state => state.action))
      .subscribe(action => {
        this.selectedAction = action.selectedAction;
        this.currentStepIndex = action.currentStepIndex;
      });
  }

  getSelectedAction(): string {
    return this.selectedAction;
  }

  getCurrentStepIndex(): number {
    return this.currentStepIndex;
  }
}
