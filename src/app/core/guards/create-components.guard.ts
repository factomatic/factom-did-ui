import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateAdvancedStepsIndexes } from '../enums/create-advanced-steps-indexes';
import { CreateBasicStepsIndexes } from '../enums/create-basic-steps-indexes';
import { CreateRoutes } from '../enums/create-routes';
import { WorkflowService } from '../services/workflow.service';
import { ActionType } from '../enums/action-type';

@Injectable({
 providedIn: 'root'
})
export class CreateComponentsGuard implements CanActivate {

  private createAdvancedStepsIndexes = {
   [CreateRoutes.PublicKeys]: CreateAdvancedStepsIndexes.PublicKeys,
   [CreateRoutes.AuthenticationKeys]: CreateAdvancedStepsIndexes.AuthenticationKeys,
   [CreateRoutes.Services]: CreateAdvancedStepsIndexes.Services,
   [CreateRoutes.EncryptKeys]: CreateAdvancedStepsIndexes.EncryptKeys,
   [CreateRoutes.Summary]: CreateAdvancedStepsIndexes.Summary
  };

  private createBasicStepsIndexes = {
    [CreateRoutes.EncryptKeys]: CreateBasicStepsIndexes.EncryptKeys,
    [CreateRoutes.Summary]: CreateBasicStepsIndexes.Summary
  };

  constructor(private workflowService: WorkflowService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
    const selectedAction = this.workflowService.getSelectedAction();
    const stepsIndexes = selectedAction === ActionType.CreateAdvanced
      ? this.createAdvancedStepsIndexes
      : this.createBasicStepsIndexes;

    const currentStepIndex = stepsIndexes[state.url];
    const lastCompletedStepIndex = this.workflowService.getLastCompletedStepIndex();
    if (currentStepIndex - 1 <= lastCompletedStepIndex) {
      return true;
    }

    return false;
  }
}
