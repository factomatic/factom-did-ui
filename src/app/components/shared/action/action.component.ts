import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { MoveToStep, SelectAction } from 'src/app/core/store/action/action.actions';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  public actionType = ActionType.Create;

  constructor(
    private store: Store<AppState>,
    private router: Router) {
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));
    this.store.dispatch(new MoveToStep(CreateStepsIndexes.PublicKeys));
    this.router.navigate([`${this.actionType}/keys/public`]);
  }
}
