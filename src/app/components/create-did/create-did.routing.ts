import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationKeysComponent } from './authentication-keys/authentication-keys.component';
import { CreateComponentsGuard } from '../../core/guards/create-components.guard';
import { PublicKeysComponent } from './public-keys/public-keys.component';

const carsRoutes: Routes = [
  { path: 'keys/authentication', component: AuthenticationKeysComponent, canActivate: [ CreateComponentsGuard ] },
  { path: 'keys/public', component: PublicKeysComponent, canActivate: [ CreateComponentsGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(carsRoutes)],
  exports: [RouterModule]
})
export class CreateDIDRoutingModule { }
