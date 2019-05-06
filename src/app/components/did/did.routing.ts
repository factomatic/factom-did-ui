import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationKeysComponent } from './authentication-keys/authentication-keys.component';
import { EncryptKeysComponent } from './encrypt-keys/encrypt-keys.component';
import { PublicKeysComponent } from './public-keys/public-keys.component';
import { ServicesComponent } from './services/services.component';
import { SummaryComponent } from './summary/summary.component';

const didRoutes: Routes = [
  { path: 'keys/authentication', component: AuthenticationKeysComponent },
  { path: 'keys/encrypt', component: EncryptKeysComponent },
  { path: 'keys/public', component: PublicKeysComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(didRoutes)],
  exports: [RouterModule]
})
export class CreateDIDRoutingModule { }
