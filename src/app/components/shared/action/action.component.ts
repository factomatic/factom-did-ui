import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { ClearForm, SelectAction } from 'src/app/core/store/action/action.actions';
import { CreateAdvancedInfoModalComponent } from '../../modals/create-advanced-info-modal/create-advanced-info-modal.component';
import { CreateBasicInfoModalComponent } from '../../modals/create-basic-info-modal/create-basic-info-modal.component';
import { KeysService } from 'src/app/core/services/keys.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  public actionType = ActionType.CreateBasic;
  public infoModals = { };

  ngOnInit() {
    this.store.dispatch(new ClearForm());
    this.registerInfoModals();
  }

  constructor(
    private keysService: KeysService,
    private modalService: NgbModal,
    private store: Store<AppState>,
    private workflowService: WorkflowService) { }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));

    if (this.actionType === ActionType.CreateBasic) {
      this.keysService.autoGeneratePublicKey();
    }

    this.workflowService.moveToNextStep();
    setTimeout(() => this.openInfoModal());
  }

  openInfoModal() {
    this.modalService.open(this.infoModals[this.actionType], {size: 'lg'});
  }

  private registerInfoModals() {
    this.infoModals[ActionType.CreateAdvanced] = CreateAdvancedInfoModalComponent;
    this.infoModals[ActionType.CreateBasic] = CreateBasicInfoModalComponent;
  }
}
