import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddAuthenticationKey, RemoveAuthenticationKey } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { ComponentKeyModel } from 'src/app/core/models/component-key.model';
import CustomValidators from 'src/app/core/utils/customValidators';
import { DIDService } from 'src/app/core/services/did.service';
import { KeyModel } from 'src/app/core/models/key.model';
import { KeysService } from 'src/app/core/services/keys.service';
import { SignatureType } from 'src/app/core/enums/signature-type';
import { TooltipMessages } from 'src/app/core/utils/tooltip.messages';
import { WorkflowService } from 'src/app/core/services/workflow.service';

const GENERATE_ACTION = 'generate';
const UP_POSITION = 'up';
const DOWN_POSITION = 'down';

@Component({
  selector: 'app-authentication-keys',
  templateUrl: './authentication-keys.component.html',
  styleUrls: ['./authentication-keys.component.scss']
})
export class AuthenticationKeysComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private subscription$: Subscription;
  private didId: string;
  public keyForm: FormGroup;
  public selectedAction = GENERATE_ACTION;
  public selectedKey: KeyModel;
  public authenticationKeys: ComponentKeyModel[] = [];
  public availablePublicKeys: ComponentKeyModel[] = [];
  public actionDropdownTooltipMessage = TooltipMessages.AuthenticationDropdownTooltip;
  public continueButtonText: string;

  constructor(
    private fb: FormBuilder,
    private zone: NgZone,
    private store: Store<AppState>,
    private keysService: KeysService,
    private didService: DIDService,
    private workflowService: WorkflowService) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
      .pipe(select(state => state))
      .subscribe(state => {
        this.authenticationKeys = state.form.authenticationKeys
          .map(key => new ComponentKeyModel(key, DOWN_POSITION));

        this.availablePublicKeys = state.form.publicKeys
          .filter(k => !state.form.authenticationKeys.includes(k))
          .map(key => new ComponentKeyModel(key, DOWN_POSITION));

        this.continueButtonText = this.authenticationKeys.length > 0 ? 'Next' : 'Skip';
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
      alias: ['', [
        Validators.required,
        CustomValidators.uniqueKeyAlias(
          this.availablePublicKeys.map(key => key.keyModel),
          this.authenticationKeys.map(key => key.keyModel)
        )
      ]]
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

    this.store.dispatch(new AddAuthenticationKey(generatedKey));
    this.createForm();
  }

  changeAction(event) {
    this.selectedAction = event.target.value;
    if (this.selectedAction !== GENERATE_ACTION) {
      this.selectedKey = this.availablePublicKeys.find(k => k.keyModel.publicKey === this.selectedAction).keyModel;
    } else {
      this.selectedKey = undefined;
    }

    setTimeout(() => {
      this.collapses.forEach((collapse: CollapseComponent, index) => {
        if (index === this.collapses.length - 1) {
          this.zone.run(() => {
            collapse.toggle();
          });
        }
      });
    });
  }

  addSelectedKey() {
    this.store.dispatch(new AddAuthenticationKey(this.selectedKey));
    this.selectedKey = undefined;
    this.selectedAction = GENERATE_ACTION;

    setTimeout(() => {
      this.collapses.forEach((collapse: CollapseComponent, index) => {
        if (index === this.collapses.length - 1) {
          this.zone.run(() => {
            collapse.toggle();
          });
        }
      });
    });
  }

  removeKey(key: KeyModel) {
    this.store.dispatch(new RemoveAuthenticationKey(key));
    this.createForm();
  }

  toggleKey(keyModel) {
    const publicKey = this.authenticationKeys.find(k => k.keyModel === keyModel);
    publicKey.iconPosition = publicKey.iconPosition === DOWN_POSITION ? UP_POSITION : DOWN_POSITION;
  }

  goToNext() {
    this.workflowService.moveToNextStep();
  }

  goToPrevious() {
    this.workflowService.moveToPreviousStep();
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
