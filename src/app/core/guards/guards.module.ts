import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateActionGuard } from './create-action.guard';
import { FinalComponentGuard } from './final-component.guard';

@NgModule({
  providers: [
    CreateActionGuard,
    FinalComponentGuard
  ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule { }
