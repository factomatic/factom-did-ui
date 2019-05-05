import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionType } from '../enums/action-type';
import { CreateAdvancedStepsIndexes } from '../enums/create-advanced-steps-indexes';
import { CreateBasicStepsIndexes } from '../enums/create-basic-steps-indexes';
import { SharedRoutes } from '../enums/shared-routes';
import { WorkflowService } from '../services/workflow.service';

@Injectable({
 providedIn: 'root'
})
export class FinalComponentGuard implements CanActivate {
  constructor(
    private router: Router,
    private workflowService: WorkflowService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

    const selectedAction = this.workflowService.getSelectedAction();
    const finalStepIndex = selectedAction === ActionType.CreateAdvanced
      ? CreateAdvancedStepsIndexes.Final
      : CreateBasicStepsIndexes.Final;

    const currentStepIndex = this.workflowService.getCurrentStepIndex();
    if (currentStepIndex !== finalStepIndex) {
      this.router.navigate([SharedRoutes.Action]);
      return false;
    }

    return true;
  }
}
