import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddPublicKey, RemovePublicKey } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { ClearForm, MoveToStep } from 'src/app/core/store/action/action.actions';
import { ComponentKeyModel } from 'src/app/core/models/component-key.model';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import CustomValidators from 'src/app/core/utils/customValidators';
import { DIDService } from 'src/app/core/services/did.service';
import { InfoModalComponent } from 'src/app/components/shared/info-modal/info-modal.component';
import { KeysService } from 'src/app/core/services/keys.service';
import { KeyModel } from 'src/app/core/models/key.model';
import { SharedRoutes } from 'src/app/core/enums/shared-routes';
import { SignatureType } from 'src/app/core/enums/signature-type';
import { TooltipMessages } from 'src/app/core/utils/tooltip.messages';

const UP_POSITION = 'up';
const DOWN_POSITION = 'down';

@Component({
  selector: 'app-public-keys',
  templateUrl: './public-keys.component.html',
  styleUrls: ['./public-keys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublicKeysComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private subscription$: Subscription;
  private didId: string;
  private authenticationKeys: KeyModel[] = [];
  public publicKeys: ComponentKeyModel[] = [];
  public keyForm: FormGroup;
  public aliasTooltipMessage = TooltipMessages.AliasTooltip;
  public controllerTooltipMessage = TooltipMessages.ControllerTooltip;
  public signatureTypeTooltipMessage = TooltipMessages.SignatureTypeTooltip;
  public continueButtonText: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private store: Store<AppState>,
    private keysService: KeysService,
    private didService: DIDService) {
    super();
  }

  ngOnInit() {
    setTimeout(() => this.openInfoModal());

    this.subscription$ = this.store
     .pipe(select(state => state))
     .subscribe(state => {
        this.publicKeys = state.form.publicKeys.map(key => new ComponentKeyModel(key, DOWN_POSITION));
        this.authenticationKeys = state.form.authenticationKeys;

        this.continueButtonText = this.publicKeys.length > 0 ? 'Next' : 'Skip';
     });

    this.subscriptions.push(this.subscription$);

    this.didId = this.didService.getId();
    this.createForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.collapses.forEach((collapse: CollapseComponent, index) => {
        if (index === this.collapses.length - 1) {
          collapse.toggle();
        }
      });
    });
  }

  createForm() {
    this.keyForm = this.fb.group({
      type: [SignatureType.EdDSA, [Validators.required]],
      controller: [this.didId, [Validators.required]],
      alias: ['', [Validators.required, CustomValidators.uniqueKeyAlias(this.publicKeys.map(key => key.keyModel), this.authenticationKeys)]]
    });
  }

  generateKey() {
    if (this.keyForm.invalid) {
      return;
    }

    const keyPair = this.keysService.generateKeyPair(this.type.value);
    const generatedKey = new KeyModel(
      this.alias.value,
      this.type.value,
      this.controller.value,
      keyPair.publicKey,
      keyPair.privateKey
    );

    this.store.dispatch(new AddPublicKey(generatedKey));
    this.createForm();
  }

  removeKey(key: KeyModel) {
    this.store.dispatch(new RemovePublicKey(key));
    this.createForm();
  }

  toggleKey(keyModel) {
    const publicKey = this.publicKeys.find(k => k.keyModel === keyModel);
    publicKey.iconPosition = publicKey.iconPosition === DOWN_POSITION ? UP_POSITION : DOWN_POSITION;
  }

  openInfoModal() {
    this.modalService.open(InfoModalComponent, {size: 'lg'});
  }

  goToNext() {
    this.store.dispatch(new MoveToStep(CreateStepsIndexes.AuthenticationKeys));
    this.router.navigate([CreateRoutes.AuthenticationKeys]);
  }

  goToPrevious() {
    this.store.dispatch(new ClearForm());
    this.router.navigate([SharedRoutes.Action]);
  }

  get type () {
    return this.keyForm.get('type');
  }

  get alias () {
    return this.keyForm.get('alias');
  }

  get controller () {
    return this.keyForm.get('controller');
  }
}
