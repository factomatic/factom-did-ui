import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionComponent } from './components/shared/action/action.component';
import { CreateActionGuard } from './core/guards/create-action.guard';
import { FinalComponent } from './components/shared/final/final.component';
import { FinalComponentGuard } from './core/guards/final-component.guard';
import { UpdateActionGuard } from './core/guards/update-action.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'action' },
  { path: 'action', component: ActionComponent },
  { path: 'create', loadChildren: './components/did/did.module#DIDModule', canActivate: [ CreateActionGuard ] },
  { path: 'update', loadChildren: './components/did/did.module#DIDModule', canActivate: [ UpdateActionGuard ] },
  { path: 'final', component: FinalComponent, canActivate: [ FinalComponentGuard ] },
  { path: '**', redirectTo: 'action' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
