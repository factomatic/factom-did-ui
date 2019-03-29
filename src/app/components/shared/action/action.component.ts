import { Component, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { InfoModalComponent } from 'src/app/components/shared/info-modal/info-modal.component';
import { MoveToStep, SelectAction } from 'src/app/core/store/action/action.actions';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements AfterViewInit {
  public actionType = ActionType.Create;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router) {
  }

  ngAfterViewInit() {
    setTimeout(() => this.openInfoModal());
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));
    this.store.dispatch(new MoveToStep(CreateStepsIndexes.PublicKeys));
    this.router.navigate([`${this.actionType}/keys/public`]);
  }

  openInfoModal() {
    this.modalService.open(InfoModalComponent, {size: 'lg'});
  }
}
