import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateStepsIndexes } from '../enums/create-steps-indexes';
import { CreateRoutes } from '../enums/create-routes';
import { WorkflowService } from '../services/workflow.service';

@Injectable({
 providedIn: 'root'
})
export class CreateComponentsGuard implements CanActivate {

  private createStepsIndexes = {
   [CreateRoutes.PublicKeys]: CreateStepsIndexes.PublicKeys,
   [CreateRoutes.AuthenticationKeys]: CreateStepsIndexes.AuthenticationKeys,
   [CreateRoutes.Services]: CreateStepsIndexes.Services,
   [CreateRoutes.EncryptKeys]: CreateStepsIndexes.EncryptKeys,
   [CreateRoutes.Summary]: CreateStepsIndexes.Summary
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
