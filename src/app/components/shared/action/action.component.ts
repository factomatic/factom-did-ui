import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateAdvancedStepsIndexes } from 'src/app/core/enums/create-advanced-steps-indexes';
import { MoveToStep, SelectAction } from 'src/app/core/store/action/action.actions';
import { CreateRoutes } from 'src/app/core/enums/create-routes';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  public actionType = ActionType.CreateAdvanced;

  constructor(
    private store: Store<AppState>,
    private router: Router) {
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));

    if (this.actionType === ActionType.CreateAdvanced) {
      this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.PublicKeys));
      this.router.navigate([CreateRoutes.PublicKeys]);
    }
  }
}
