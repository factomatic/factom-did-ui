import { ActionReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { appReducers } from './core/store/app.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppState } from './core/store/app.state';
import { CreateDIDModule } from './components/create-did/create-did.module';
import { environment } from '../environments/environment';
import { GuardsModule } from './core/guards/guards.module';
import { ServicesModule } from './core/services/services.module';
import { SharedModule } from './components/shared/shared.module';
import { storeLogger } from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CreateDIDModule,
    GuardsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ServicesModule,
    SharedModule,
    StoreModule.forRoot(appReducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
