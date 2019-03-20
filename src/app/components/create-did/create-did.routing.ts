import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationKeysComponent } from './authentication-keys/authentication-keys.component';
import { CreateComponentsGuard } from '../../core/guards/create-components.guard';
import { EncryptKeysComponent } from './encrypt-keys/encrypt-keys.component';
import { PublicKeysComponent } from './public-keys/public-keys.component';
import { ServicesComponent } from './services/services.component';
import { SummaryComponent } from './summary/summary.component';

const carsRoutes: Routes = [
  { path: 'keys/authentication', component: AuthenticationKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'keys/encrypt', component: EncryptKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'keys/public', component: PublicKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'services', component: ServicesComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'summary', component: SummaryComponent, canActivate: [ CreateComponentsGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(carsRoutes)],
  exports: [RouterModule]
})
export class CreateDIDRoutingModule { }
