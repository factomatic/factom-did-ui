import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { sharedComponents } from '.';

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ...sharedComponents
  ]
})
export class SharedModule { }
