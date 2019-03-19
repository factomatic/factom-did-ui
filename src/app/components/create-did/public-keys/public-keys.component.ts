import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddPublicKey, RemovePublicKey } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import CustomValidators from 'src/app/core/utils/customValidators';
import { DIDService } from 'src/app/core/services/did.service';
import { KeysService } from 'src/app/core/services/keys.service';
import { KeyModel } from 'src/app/core/models/key.model';
import { SignatureType } from 'src/app/core/enums/signature-type';

@Component({
  selector: 'app-public-keys',
  templateUrl: './public-keys.component.html',
  styleUrls: ['./public-keys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublicKeysComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private subscription$: Subscription;
  private lastCompletedStepIndex: number;
  private didId: string;
  private authenticationKeys: KeyModel[] = [];
  protected publicKeys: KeyModel[] = [];
  protected keyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
        this.publicKeys = state.form.publicKeys;
        this.authenticationKeys = state.form.authenticationKeys;
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
      alias: ['', [Validators.required, CustomValidators.uniqueKeyAlias(this.publicKeys, this.authenticationKeys)]]
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

  goToNext() {
    if (this.lastCompletedStepIndex === CreateStepsIndexes.Action) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.PublicKeys));
    }

    this.router.navigate([CreateRoutes.AuthenticationKeys]);
  }

  goToPrevious() {
    this.router.navigate([CreateRoutes.Action]);
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
