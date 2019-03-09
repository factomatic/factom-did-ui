import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AddServices } from 'src/app/core/store/form/form.actions';
import { AppState } from 'src/app/core/store/app.state';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import { ServiceModel } from 'src/app/core/models/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  protected services: ServiceModel[] = [];
  protected serviceForm;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      type: ['', [Validators.required]],
      endpoint: ['', [Validators.required]],
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

  addService() {
    if (this.serviceForm.invalid) {
      return;
    }

    this.services.push(new ServiceModel(
      this.type.value,
      this.endpoint.value,
      this.alias.value
    ));

    this.serviceForm.reset();
  }

  goToNext() {
    if (this.services.length > 0) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.Services));
      this.store.dispatch(new AddServices(this.services));
      this.router.navigate(['/create/services']);
    }
  }

  goToPrevious() {
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
