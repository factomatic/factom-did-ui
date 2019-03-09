import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';

@Component({
  selector: 'app-authentication-keys',
  templateUrl: './authentication-keys.component.html',
  styleUrls: ['./authentication-keys.component.scss']
})
export class AuthenticationKeysComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  protected title = 'Select authentication keys or generate new one';
  protected keyForm;
  protected selectedAction = 'generate';
  protected selectedKey;
  protected authenticationKeys = [
    {
      type: 'Ed25519VerificationKey2018',
      controller: 'did:example:123456789abcdefghi',
      alias: 'My first key',
      pubKey: '2aommKjGU5bVm3HfaetG...NrcMTBHhTv'
    }
  ];
  protected availablePublicKeys = [{
    type: 'Ed25519VerificationKey2018',
    controller: 'did:example:123456789abcdefghi',
    alias: 'My second key',
    pubKey: '2aommKjGU5bVm3HfaetG...NrcMTBHhTV'
  }];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private zone: NgZone,
    private store: Store<AppState>) { }

  ngOnInit() {
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

    this.authenticationKeys.push({
      type: this.type.value,
      controller: this.controller.value,
      alias: this.alias.value,
      pubKey: '2aommKjGU5bVm3HfaetG...NrcMTBHhTv'
    });

    this.keyForm.reset();
  }

  changeAction(event) {
    this.selectedAction = event.target.value;
    if (this.selectedAction !== 'generate') {
      this.selectedKey = this.availablePublicKeys.find(k => k.pubKey === this.selectedAction);
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
    this.availablePublicKeys = this.availablePublicKeys.filter(k => k.pubKey !== this.selectedKey.pubKey);
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

  goToNext() {
    if (this.authenticationKeys.length > 0) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.AuthenticationKeys));
      this.router.navigate(['/create/services']);
    }
  }

  goToPrevious() {
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
