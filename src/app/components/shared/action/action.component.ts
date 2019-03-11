import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep, SelectAction } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  private lastCompletedStepIndex: number;
  protected actionType: string;

  constructor(
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(state => state.action))
      .subscribe(action => {
        this.lastCompletedStepIndex = action.lastCompletedStepIndex;
        this.actionType = action.selectedAction;
      });
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));

    if (this.lastCompletedStepIndex === 0) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.Action));
    }

    this.router.navigate([`${this.actionType}/keys/public`]);
  }
}
