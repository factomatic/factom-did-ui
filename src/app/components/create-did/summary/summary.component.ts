import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateAdvancedStepsIndexes } from 'src/app/core/enums/create-advanced-steps-indexes';
import { CreateBasicStepsIndexes } from 'src/app/core/enums/create-basic-steps-indexes';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { DIDService } from 'src/app/core/services/did.service';
import { environment } from 'src/environments/environment';
import { MoveToStep } from 'src/app/core/store/action/action.actions';
import { SharedRoutes } from 'src/app/core/enums/shared-routes';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public didDocument: string;
  public documentSizeExceeded: boolean;
  public recordOnChainButtonName = 'Record on-chain';

  constructor(
    private deviceService: DeviceDetectorService,
    private didService: DIDService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private workflowService: WorkflowService) {
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.recordOnChainButtonName = 'Record';
    }

    const didDocumentResult = this.didService.generateDocument();
    this.didDocument = didDocumentResult.document;
    if (didDocumentResult.size > environment.entrySizeLimit) {
      this.documentSizeExceeded = true;
    }
  }

  recordOnChain() {
    if (!this.documentSizeExceeded) {
      this.spinner.show();
      this.didService
        .recordOnChain()
        .subscribe((res: any) => {
          const selectedAction = this.workflowService.getSelectedAction();
          if (selectedAction === ActionType.CreateAdvanced) {
            this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.Final));
          } else if (selectedAction === ActionType.CreateBasic) {
            this.store.dispatch(new MoveToStep(CreateBasicStepsIndexes.Final));
          }

          this.spinner.hide();
          this.router.navigate([SharedRoutes.Final], { queryParams: { url: res.url } });
        });
    }
  }

  goToPrevious() {
    const selectedAction = this.workflowService.getSelectedAction();
    if (selectedAction === ActionType.CreateAdvanced) {
      this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.EncryptKeys));
    } else if (selectedAction === ActionType.CreateBasic) {
      this.store.dispatch(new MoveToStep(CreateBasicStepsIndexes.EncryptKeys));
    }

    this.router.navigate([CreateRoutes.EncryptKeys]);
  }
}
