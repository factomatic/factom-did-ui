import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';

@Component({
  selector: 'app-public-keys',
  templateUrl: './public-keys.component.html',
  styleUrls: ['./public-keys.component.scss']
})
export class PublicKeysComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  protected generatedKeys = [];
  protected title = 'Generate public keys for your DID';
  protected keyForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    });
  }

  generateKey() {
    if (this.keyForm.invalid) {
      return;
    }

    this.generatedKeys.push({
      type: this.type.value,
      controller: this.controller.value,
      alias: this.alias.value,
      pubKey: '2aommKjGU5bVm3HfaetG...NrcMTBHhTv'
    });

    this.keyForm.reset();
  }

  goToNext() {
    if (this.generatedKeys.length > 0) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.PublicKeys));
      this.router.navigate(['/create/keys/authentication']);
    }
  }

  goToPrevious() {
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
