import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';

import { ActionType } from 'src/app/core/enums/action-type';
import { DIDService } from 'src/app/core/services/did.service';
import { EntryType } from 'src/app/core/enums/entry-type';
import { environment } from 'src/environments/environment';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public entry: {};
  public entryPretified: string;
  public entryType: string;
  public entrySizeExceeded: boolean;
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

    const selectedAction = this.workflowService.getSelectedAction();
    this.entryType = selectedAction === ActionType.Update ? EntryType.UpdateDIDEntry : EntryType.CreateDIDEntry;
    this.entry = this.didService.generateEntry(this.entryType);
    this.entryPretified = JSON.stringify(this.entry, null, 2);

    if (this.didService.getEntrySize(this.entry, this.entryType) > environment.entrySizeLimit) {
      this.entrySizeExceeded = true;
    }
  }

  recordOnChain() {
    if (!this.entrySizeExceeded) {
      this.spinner.show();
      this.didService
        .recordOnChain(this.entry, this.entryType)
        .subscribe((res: any) => {
          this.spinner.hide();
          const didId = this.didService.getId();
          this.didService.clearData();
          this.workflowService.moveToNextStep({ queryParams: { url: res.url, didId: didId } });
        });
    }
  }

  goToPrevious() {
    this.workflowService.moveToPreviousStep();
  }
}
