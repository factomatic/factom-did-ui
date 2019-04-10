import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { CreateAdvancedStepsIndexes } from 'src/app/core/enums/create-advanced-steps-indexes';
import { DIDService } from 'src/app/core/services/did.service';
import { environment } from 'src/environments/environment';
import { MoveToStep } from 'src/app/core/store/action/action.actions';

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
    private store: Store<AppState>) {
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
      this.didService.recordOnChain();
    }
  }

  goToPrevious() {
    this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.EncryptKeys));
    this.router.navigate([CreateRoutes.EncryptKeys]);
  }
}
