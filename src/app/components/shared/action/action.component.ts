import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { CompleteStep, SelectAction } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent extends BaseComponent implements OnInit {
  private subscription$: Subscription;
  private lastCompletedStepIndex: number;
  protected actionType: string;

  constructor(
    private store: Store<AppState>,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store.pipe(select(state => state.action))
      .subscribe(action => {
        this.lastCompletedStepIndex = action.lastCompletedStepIndex;
        this.actionType = action.selectedAction;
      });

    this.subscriptions.push(this.subscription$);
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));

    if (this.lastCompletedStepIndex === 0) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.Action));
    }

    this.router.navigate([`${this.actionType}/keys/public`]);
  }
}
