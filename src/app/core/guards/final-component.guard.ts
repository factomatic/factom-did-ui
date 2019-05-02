import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateAdvancedStepsIndexes } from '../enums/create-advanced-steps-indexes';
import { WorkflowService } from '../services/workflow.service';
import { ActionType } from '../enums/action-type';
import { CreateBasicStepsIndexes } from '../enums/create-basic-steps-indexes';

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
    const summaryStepIndex = selectedAction === ActionType.CreateAdvanced
      ? CreateAdvancedStepsIndexes.Summary
      : CreateBasicStepsIndexes.Summary;

    const lastCompletedStepIndex = this.workflowService.getLastCompletedStepIndex();
    if (lastCompletedStepIndex < summaryStepIndex) {
      this.router.navigate(['action']);
    }

    return true;
  }
}
