import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { CreateRoutes } from 'src/app/core/enums/create-routes';
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
    private spinner: NgxSpinnerService) {
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
      this.spinner.show();
      this.didService.recordOnChain();
    }
  }

  goToPrevious() {
    this.router.navigate([CreateRoutes.EncryptKeys]);
  }
}
