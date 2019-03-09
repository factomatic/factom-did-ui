import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateActionGuard } from './create-action.guard';

@NgModule({
  providers: [
    CreateActionGuard
  ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule { }
