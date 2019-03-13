import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AddServices } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import CustomValidators from 'src/app/core/utils/customValidators';
import { ServiceModel } from 'src/app/core/models/service.model';
import { BaseComponent } from '../../base.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  private subscription$: Subscription;
  private formChange: boolean;
  private lastCompletedStepIndex: number;
  protected services: ServiceModel[] = [];
  protected serviceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
      .pipe(select(state => state))
      .subscribe(state => {
        this.lastCompletedStepIndex = state.action.lastCompletedStepIndex;
        this.services = state.form.services;
      });

    this.subscriptions.push(this.subscription$);

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
    this.serviceForm = this.fb.group({
      type: ['', [Validators.required]],
      endpoint: ['', [Validators.required]],
      alias: ['', [Validators.required, CustomValidators.uniqueServiceAlias(this.services)]]
    });
  }

  addService() {
    if (this.serviceForm.invalid) {
      return;
    }

    this.services.push(new ServiceModel(
      this.type.value,
      this.endpoint.value,
      this.alias.value
    ));

    this.formChange = true;
    this.createForm();
  }

  removeService(service: ServiceModel) {
    this.services = this.services.filter(s => s !== service);
    this.createForm();
    this.formChange = true;
  }

  goToNext() {
    if (this.formChange) {
      this.store.dispatch(new AddServices(this.services));
    }

    if (this.lastCompletedStepIndex === CreateStepsIndexes.AuthenticationKeys) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.Services));
    }

    this.router.navigate(['/create/keys/encrypt']);
  }

  goToPrevious() {
    if (this.formChange) {
      this.store.dispatch(new AddServices(this.services));
    }

    this.router.navigate(['/create/keys/authentication']);
  }

  get type () {
    return this.serviceForm.get('type');
  }

  get alias () {
    return this.serviceForm.get('alias');
  }

  get endpoint () {
    return this.serviceForm.get('endpoint');
  }
}
