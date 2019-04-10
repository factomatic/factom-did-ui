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

    const lastCompletedStepIndex = this.workflowService.getLastCompletedStepIndex();
    if (lastCompletedStepIndex < CreateAdvancedStepsIndexes.Summary) {
      this.router.navigate(['action']);
    }

    return true;
  }
}
