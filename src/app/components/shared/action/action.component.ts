import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateAdvancedInfoModalComponent } from '../../create-did/create-advanced-info-modal/create-advanced-info-modal.component';
import { CreateAdvancedStepsIndexes } from 'src/app/core/enums/create-advanced-steps-indexes';
import { CreateBasicStepsIndexes } from 'src/app/core/enums/create-basic-steps-indexes';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { MoveToStep, SelectAction, ClearForm } from 'src/app/core/store/action/action.actions';
import { KeysService } from 'src/app/core/services/keys.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  public actionType = ActionType.CreateBasic;

  ngOnInit() {
    this.store.dispatch(new ClearForm());
  }

  constructor(
    private keysService: KeysService,
    private modalService: NgbModal,
    private store: Store<AppState>,
    private router: Router) { }

  goToNext() {
    if (this.actionType === ActionType.CreateAdvanced) {
      this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.PublicKeys));
      this.router.navigate([CreateRoutes.PublicKeys]);
    } else if (this.actionType === ActionType.CreateBasic) {
      this.keysService.autoGeneratePublicKey();
      this.store.dispatch(new MoveToStep(CreateBasicStepsIndexes.EncryptKeys));
      this.router.navigate([CreateRoutes.EncryptKeys]);
    }

    this.store.dispatch(new SelectAction(this.actionType));
    setTimeout(() => this.openInfoModal());
  }

  openInfoModal() {
    if (this.actionType === ActionType.CreateAdvanced) {
      this.modalService.open(CreateAdvancedInfoModalComponent, {size: 'lg'});
    }
  }
}
