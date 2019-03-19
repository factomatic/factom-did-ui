import { CommonModule } from '@angular/common';
import { createComponents } from '.';
import { CreateDIDRoutingModule } from './create-did.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import hljs from 'highlight.js/lib/highlight';
import json from 'highlight.js/lib/languages/json';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

hljs.registerLanguage('json', json);

export function highlightJsFactory() {
  return hljs;
}

@NgModule({
  declarations: [
    ...createComponents
  ],
  imports: [
    CommonModule,
    CreateDIDRoutingModule,
    FormsModule,
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    MDBBootstrapModule.forRoot(),
    NgbTooltipModule,
    ReactiveFormsModule
  ],
  exports: [
    ...createComponents
  ]
})
export class CreateDIDModule { }
