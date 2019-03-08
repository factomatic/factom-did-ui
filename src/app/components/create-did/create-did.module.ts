import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';

import { createComponents } from '.';
import { CreateDIDRoutingModule } from './create-did.routing';

@NgModule({
  declarations: [
    ...createComponents
  ],
  imports: [
    CommonModule,
    CreateDIDRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    ...createComponents
  ]
})
export class CreateDIDModule { }
