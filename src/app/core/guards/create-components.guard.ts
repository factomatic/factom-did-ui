import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateStepsUrls } from '../enums/create-steps-urls';
import { WorkflowService } from '../services/workflow.service';

@Injectable({
 providedIn: 'root'
})
export class CreateComponentsGuard implements CanActivate {

  private createStepsIndexes = {
   [CreateStepsUrls.PublicKeys]: 2,
   [CreateStepsUrls.AuthenticationKeys]: 3,
   [CreateStepsUrls.Services]: 4,
   [CreateStepsUrls.EncryptKeys]: 5,
   [CreateStepsUrls.Finalize]: 6
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
