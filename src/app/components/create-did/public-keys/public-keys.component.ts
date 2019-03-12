import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddPublicKeys, RemovePublicKey } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { KeysService } from 'src/app/core/services/keys.service';
import { KeyModel } from 'src/app/core/models/key.model';
import { KeyType } from 'src/app/core/enums/key-type';

@Component({
  selector: 'app-public-keys',
  templateUrl: './public-keys.component.html',
  styleUrls: ['./public-keys.component.scss']
})
export class PublicKeysComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private subscription$: Subscription;
  private formChange: boolean;
  private lastCompletedStepIndex: number;
  protected generatedKeys: KeyModel[] = [];
  protected keyForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private keysService: KeysService) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
     .pipe(select(state => state))
     .subscribe(state => {
        this.lastCompletedStepIndex = state.action.lastCompletedStepIndex;
        this.generatedKeys = state.form.publicKeys.slice();
     });

    this.subscriptions.push(this.subscription$);

    this.keyForm = this.fb.group({
      type: ['', [Validators.required]],
      controller: ['', [Validators.required]],
      alias: ['', [Validators.required]]
    });
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

  generateKey() {
    if (this.keyForm.invalid) {
      return;
    }

    if (this.type.value === KeyType.Ed25519) {
      const keyPair = this.keysService.generateEd25519KeyPair();
      const generatedKey = new KeyModel(
        this.alias.value,
        KeyType.Ed25519,
        this.controller.value,
        keyPair.publicKey,
        keyPair.privateKey
      );

      this.generatedKeys.push(generatedKey);

    } else if (this.type.value === KeyType.Secp256k1) {
      const keyPair = this.keysService.generateSecp256k1KeyPair();
      const generatedKey = new KeyModel(
        this.alias.value,
        KeyType.Secp256k1,
        this.controller.value,
        keyPair.publicKey,
        keyPair.privateKey
      );

      this.generatedKeys.push(generatedKey);
    }

    this.formChange = true;
    this.keyForm.reset();
  }

  removeKey(key: KeyModel) {
    this.generatedKeys = this.generatedKeys.filter(k => k !== key);
    this.store.dispatch(new RemovePublicKey(key));
    this.formChange = true;
  }

  goToNext() {
    if (this.generatedKeys.length > 0) {
      if (this.formChange) {
        this.store.dispatch(new AddPublicKeys(this.generatedKeys));
      }

      if (this.lastCompletedStepIndex === CreateStepsIndexes.Action) {
        this.store.dispatch(new CompleteStep(CreateStepsIndexes.PublicKeys));
      }

      this.router.navigate(['/create/keys/authentication']);
    }
  }

  goToPrevious() {
    if (this.formChange) {
      this.store.dispatch(new AddPublicKeys(this.generatedKeys));
    }

    this.router.navigate(['action']);
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
