import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const carsRoutes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(carsRoutes)],
  exports: [RouterModule]
})
export class CreateDIDRoutingModule { }
