import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { CompleteStep, SelectAction } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { InfoModalComponent } from 'src/app/components/shared/info-modal/info-modal.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent extends BaseComponent implements OnInit, AfterViewInit {
  private subscription$: Subscription;
  private lastCompletedStepIndex: number;
  protected actionType = ActionType.Create;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store.pipe(select(state => state.action))
      .subscribe(action => {
        this.lastCompletedStepIndex = action.lastCompletedStepIndex;
      });

    this.subscriptions.push(this.subscription$);
  }

  ngAfterViewInit() {
    setTimeout(() => this.openInfoModal());
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));

    if (this.lastCompletedStepIndex === 0) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.Action));
    }

    this.router.navigate([`${this.actionType}/keys/public`]);
  }

  openInfoModal() {
    this.modalService.open(InfoModalComponent, {size: 'lg'});
  }
}
