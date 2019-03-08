import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicKeysComponent } from './public-keys/public-keys.component';

const carsRoutes: Routes = [
  { path: 'keys/public', component: PublicKeysComponent }
];

@NgModule({
  imports: [RouterModule.forChild(carsRoutes)],
  exports: [RouterModule]
})
export class CreateDIDRoutingModule { }
