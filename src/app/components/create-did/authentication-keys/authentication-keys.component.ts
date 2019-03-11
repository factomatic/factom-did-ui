import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AddAuthenticationKeys } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { KeyModel } from 'src/app/core/models/key.model';
import { KeyType } from 'src/app/core/enums/key-type';
import { KeysService } from 'src/app/core/services/keys.service';

@Component({
  selector: 'app-authentication-keys',
  templateUrl: './authentication-keys.component.html',
  styleUrls: ['./authentication-keys.component.scss']
})
export class AuthenticationKeysComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private allPublicKeys: KeyModel[];
  protected keyForm;
  protected selectedAction = 'generate';
  protected selectedKey: KeyModel;
  protected authenticationKeys: KeyModel[] = [];
  protected availablePublicKeys: KeyModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone,
    private store: Store<AppState>,
    private keysService: KeysService) { }

  ngOnInit() {
    this.store
      .pipe(select(state => state.form))
      .subscribe(form => {
        this.allPublicKeys = form.publicKeys;
        this.authenticationKeys = form.authenticationKeys;
        this.availablePublicKeys = this.allPublicKeys.filter(k => !this.authenticationKeys.includes(k));
      });

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

      this.authenticationKeys.push(generatedKey);

    } else if (this.type.value === KeyType.Secp256k1) {
      const keyPair = this.keysService.generateSecp256k1KeyPair();
      const generatedKey = new KeyModel(
        this.alias.value,
        KeyType.Secp256k1,
        this.controller.value,
        keyPair.publicKey,
        keyPair.privateKey
      );

      this.authenticationKeys.push(generatedKey);
    }

    this.keyForm.reset();
  }

  changeAction(event) {
    this.selectedAction = event.target.value;
    if (this.selectedAction !== 'generate') {
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
    this.authenticationKeys.push(this.selectedKey);
    this.availablePublicKeys = this.availablePublicKeys.filter(k => k.publicKey !== this.selectedKey.publicKey);
    this.selectedKey = undefined;
    this.selectedAction = 'generate';

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
    this.authenticationKeys = this.authenticationKeys.filter(k => k.publicKey !== key.publicKey);
    if (this.allPublicKeys.find(k => k.publicKey === key.publicKey)) {
      this.availablePublicKeys.push(key);
    }
  }

  goToNext() {
    if (this.authenticationKeys.length > 0) {
      this.store.dispatch(new AddAuthenticationKeys(this.authenticationKeys));
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.AuthenticationKeys));
      this.router.navigate(['/create/services']);
    }
  }

  goToPrevious() {
    this.store.dispatch(new AddAuthenticationKeys(this.authenticationKeys));
    this.router.navigate(['/create/keys/public']);
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
