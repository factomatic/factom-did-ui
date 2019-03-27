import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionComponent } from './components/shared/action/action.component';
import { AuthenticationKeysComponent } from './components/create-did/authentication-keys/authentication-keys.component';
import { CreateActionGuard } from './core/guards/create-action.guard';
import { CreateComponentsGuard } from './core/guards/create-components.guard';
import { EncryptKeysComponent } from './components/create-did/encrypt-keys/encrypt-keys.component';
import { FinalComponentGuard } from './core/guards/final-component.guard';
import { FinalComponent } from './components/shared/final/final.component';
import { PublicKeysComponent } from './components/create-did/public-keys/public-keys.component';
import { ServicesComponent } from './components/create-did/services/services.component';
import { SummaryComponent } from './components/create-did/summary/summary.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'action' },
  { path: 'action', component: ActionComponent },
  { path: 'create/keys/authentication', component: AuthenticationKeysComponent, canActivate: [ CreateActionGuard, CreateComponentsGuard ] },
  { path: 'create/keys/encrypt', component: EncryptKeysComponent, canActivate: [ CreateActionGuard, CreateComponentsGuard ] },
  { path: 'create/keys/public', component: PublicKeysComponent, canActivate: [ CreateActionGuard, CreateComponentsGuard ] },
  { path: 'create/services', component: ServicesComponent, canActivate: [ CreateActionGuard, CreateComponentsGuard ] },
  { path: 'create/summary', component: SummaryComponent, canActivate: [ CreateActionGuard, CreateComponentsGuard ] },
  { path: 'final', component: FinalComponent, canActivate: [ FinalComponentGuard ] },
  { path: '**', redirectTo: 'action' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
