import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionComponent } from './components/shared/action/action.component';
import { CreateActionGuard } from './core/guards/create-action.guard';
import { FinalComponent } from './components/shared/final/final.component';
import { FinalComponentGuard } from './core/guards/final-component.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'action' },
  { path: 'action', component: ActionComponent },
  { path: 'create', loadChildren: './components/create-did/create-did.module#CreateDIDModule', canActivate: [ CreateActionGuard ] },
  { path: 'final', component: FinalComponent, canActivate: [ FinalComponentGuard ] },
  { path: '**', redirectTo: 'action' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
