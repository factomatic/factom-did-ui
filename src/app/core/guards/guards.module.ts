import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateActionGuard } from './create-action.guard';
import { CreateComponentsGuard } from './create-components.guard';

@NgModule({
  providers: [
    CreateActionGuard,
    CreateComponentsGuard
  ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule { }
