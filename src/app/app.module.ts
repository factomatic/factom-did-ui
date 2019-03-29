import { ActionReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { appReducers } from './core/store/app.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppState } from './core/store/app.state';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { GuardsModule } from './core/guards/guards.module';
import { ServicesModule } from './core/services/services.module';
import { SharedModule } from './components/shared/shared.module';
import { storeLogger } from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production || environment.staging ? [] : [logger];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DeviceDetectorModule.forRoot(),
    GuardsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    ServicesModule,
    SharedModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
