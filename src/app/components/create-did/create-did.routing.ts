import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationKeysComponent } from './authentication-keys/authentication-keys.component';
import { CreateComponentsGuard } from '../../core/guards/create-components.guard';
import { EncryptKeysComponent } from './encrypt-keys/encrypt-keys.component';
import { FinalizeComponent } from './finalize/finalize.component';
import { PublicKeysComponent } from './public-keys/public-keys.component';
import { ServicesComponent } from './services/services.component';

const carsRoutes: Routes = [
  { path: 'finalize', component: FinalizeComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'keys/authentication', component: AuthenticationKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'keys/encrypt', component: EncryptKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'keys/public', component: PublicKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'services', component: ServicesComponent, canActivate: [ CreateComponentsGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(carsRoutes)],
  exports: [RouterModule]
})
export class CreateDIDRoutingModule { }
