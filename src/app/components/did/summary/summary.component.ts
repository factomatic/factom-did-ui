import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';

import { DIDService } from 'src/app/core/services/did.service';
import { environment } from 'src/environments/environment';
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
    private spinner: NgxSpinnerService,
    private workflowService: WorkflowService) {
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.recordOnChainButtonName = 'Record';
    }

    this.didDocument = this.didService.generateDocument();

    if (this.didService.getDocumentSize() > environment.entrySizeLimit) {
      this.documentSizeExceeded = true;
    }
  }

  recordOnChain() {
    if (!this.documentSizeExceeded) {
      this.spinner.show();
      this.didService
        .recordOnChain()
        .subscribe((res: any) => {
          this.spinner.hide();
          this.workflowService.moveToNextStep({ queryParams: { url: res.url } });
        });
    }
  }

  goToPrevious() {
    this.workflowService.moveToPreviousStep();
  }
}
