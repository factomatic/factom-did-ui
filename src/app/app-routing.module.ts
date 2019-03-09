import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionComponent } from './components/shared/action/action.component';
import { CreateActionGuard } from './core/guards/create-action.guard';
import { CreateDIDModule } from './components/create-did/create-did.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'action' },
  { path: 'action', component: ActionComponent },
  { path: 'create', loadChildren: () => CreateDIDModule, canActivate: [ CreateActionGuard ] },
  { path: '**', redirectTo: 'action' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
