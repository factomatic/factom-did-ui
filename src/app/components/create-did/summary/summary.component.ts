import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { DIDService } from 'src/app/core/services/did.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  protected didDocument: string;
  protected documentSizeExceeded: boolean;

  constructor(
    private didService: DIDService,
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    const didDocumentResult = this.didService.generateDocument();
    this.didDocument = didDocumentResult.document;
    if (didDocumentResult.size > environment.entrySizeLimit) {
      this.documentSizeExceeded = true;
    }
  }

  recordOnChain() {
    if (!this.documentSizeExceeded) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.Summary));
    }
  }

  goToPrevious() {
    this.router.navigate(['/create/keys/encrypt']);
  }
}
