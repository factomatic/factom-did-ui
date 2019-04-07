import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { sharedComponents } from '.';
import { InfoModalComponent } from './info-modal/info-modal.component';

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    RouterModule
  ],
  exports: [
    ...sharedComponents
  ],
  entryComponents: [
    InfoModalComponent
  ],
})
export class SharedModule { }
