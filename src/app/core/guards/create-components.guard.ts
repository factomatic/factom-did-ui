import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateAdvancedStepsIndexes } from '../enums/create-advanced-steps-indexes';
import { CreateRoutes } from '../enums/create-routes';
import { WorkflowService } from '../services/workflow.service';

@Injectable({
 providedIn: 'root'
})
export class CreateComponentsGuard implements CanActivate {

  private createStepsIndexes = {
   [CreateRoutes.PublicKeys]: CreateAdvancedStepsIndexes.PublicKeys,
   [CreateRoutes.AuthenticationKeys]: CreateAdvancedStepsIndexes.AuthenticationKeys,
   [CreateRoutes.Services]: CreateAdvancedStepsIndexes.Services,
   [CreateRoutes.EncryptKeys]: CreateAdvancedStepsIndexes.EncryptKeys,
   [CreateRoutes.Summary]: CreateAdvancedStepsIndexes.Summary
  };

  constructor(private workflowService: WorkflowService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {

    const currentStepIndex = this.createStepsIndexes[state.url];
    const lastCompletedStepIndex = this.workflowService.getLastCompletedStepIndex();
    if (currentStepIndex - 1 <= lastCompletedStepIndex) {
      return true;
    }

    return false;
  }
}
