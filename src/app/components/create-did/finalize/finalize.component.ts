import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { DIDService } from 'src/app/core/services/did.service';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss']
})
export class FinalizeComponent implements OnInit {
  protected didDocument: string;

  constructor(
    private didService: DIDService,
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.didDocument = this.didService.generateDocument();
  }

  finalize() {
    this.store.dispatch(new CompleteStep(CreateStepsIndexes.Finalize));
  }

  goToPrevious() {
    this.router.navigate(['/create/keys/encrypt']);
  }
}
