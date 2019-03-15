import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddAuthenticationKey, RemoveAuthenticationKey } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import CustomValidators from 'src/app/core/utils/customValidators';
import { DIDService } from 'src/app/core/services/did.service';
import { KeyModel } from 'src/app/core/models/key.model';
import { KeyType } from 'src/app/core/enums/key-type';
import { KeysService } from 'src/app/core/services/keys.service';

const GENERATE_ACTION = 'generate';

@Component({
  selector: 'app-authentication-keys',
  templateUrl: './authentication-keys.component.html',
  styleUrls: ['./authentication-keys.component.scss']
})
export class AuthenticationKeysComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private subscription$: Subscription;
  private lastCompletedStepIndex: number;
  private didId: string;
  protected keyForm: FormGroup;
  protected selectedAction = GENERATE_ACTION;
  protected selectedKey: KeyModel;
  protected authenticationKeys: KeyModel[] = [];
  protected availablePublicKeys: KeyModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone,
    private store: Store<AppState>,
    private keysService: KeysService,
    private didService: DIDService) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
      .pipe(select(state => state))
      .subscribe(state => {
        this.lastCompletedStepIndex = state.action.lastCompletedStepIndex;
        this.authenticationKeys = state.form.authenticationKeys;
        this.availablePublicKeys = state.form.publicKeys.filter(k => !this.authenticationKeys.includes(k));
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
      type: [KeyType.Ed25519, [Validators.required]],
      controller: [this.didId, [Validators.required]],
      alias: ['', [Validators.required, CustomValidators.uniqueKeyAlias(this.availablePublicKeys, this.authenticationKeys)]]
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
      this.selectedKey = this.availablePublicKeys.find(k => k.publicKey === this.selectedAction);
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

  goToNext() {
    if (this.authenticationKeys.length > 0) {
      if (this.lastCompletedStepIndex === CreateStepsIndexes.PublicKeys) {
        this.store.dispatch(new CompleteStep(CreateStepsIndexes.AuthenticationKeys));
      }

      this.router.navigate([CreateRoutes.Services]);
    }
  }

  goToPrevious() {
    this.router.navigate([CreateRoutes.PublicKeys]);
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
