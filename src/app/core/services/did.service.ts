declare const Buffer;
import * as nacl from 'tweetnacl/nacl-fast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { CreateAdvancedStepsIndexes } from '../enums/create-advanced-steps-indexes';
import { DIDDocumentModel } from '../models/did-document.model';
import { environment } from 'src/environments/environment';
import { KeyModel } from '../models/key.model';
import { MoveToStep } from '../store/action/action.actions';
import { ServiceModel } from '../models/service.model';
import { SharedRoutes } from '../enums/shared-routes';
import { toHexString, calculateChainId } from '../utils/helpers';

@Injectable()
export class DIDService {
  private VerificationKeySuffix = 'VerificationKey';
  private CreateDIDEntry = 'CreateDID';
  private apiUrl = environment.apiUrl;
  private version = environment.version;
  private id: string;
  private nonce: string;
  private formPublicKeys: KeyModel[];
  private formAuthenticationKeys: KeyModel[];
  private formServices: ServiceModel[];
  private didDocument: Object;

  constructor (
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>) {
    this.store
     .pipe(select(state => state.form))
     .subscribe(form => {
        this.formPublicKeys = form.publicKeys;
        this.formAuthenticationKeys = form.authenticationKeys;
        this.formServices = form.services;
     });
  }

  generateDocument(): DIDDocumentModel {
    const publicKeys = this.formPublicKeys.map(k => ({
      id: `${this.id}#${k.alias}`,
      type: `${k.type}${this.VerificationKeySuffix}`,
      controller: k.controller,
      publicKeyBase58: k.publicKey
    }));

    /** Divided in two separate arrays because the embeddedKeys must be included first in the final array. */
    const embeddedAuthenticationKeys = [];
    const fullAuthenticationKeys = [];
    this.formAuthenticationKeys.forEach(k => {
      if (this.formPublicKeys.includes(k)) {
        embeddedAuthenticationKeys.push(`${this.id}#${k.alias}`);
      } else {
        fullAuthenticationKeys.push({
          id: `${this.id}#${k.alias}`,
          type: `${k.type}${this.VerificationKeySuffix}`,
          controller: k.controller,
          publicKeyBase58: k.publicKey
         });
      }
    });

    const authenticationKeys = embeddedAuthenticationKeys.concat(fullAuthenticationKeys);

    const services = this.formServices.map(s => ({
      id: `${this.id}#${s.alias}`,
      type: s.type,
      serviceEndpoint: s.endpoint
    }));

    this.didDocument = {
      '@context': 'https://w3id.org/did/v1',
      'id': this.id,
      'publicKey': publicKeys,
      'authentication': authenticationKeys,
      'service': services
    };

    const document = JSON.stringify(this.didDocument, null, 2);

    const documentSize = this.calculateEntrySize(
      [this.nonce],
      [this.CreateDIDEntry, this.version],
      JSON.stringify(this.didDocument)
    );

    return new DIDDocumentModel(document, documentSize);
  }

  getId(): string {
    if (!this.id) {
      return this.generateId();
    }

    return this.id;
  }

  recordOnChain(): void {
    const data = JSON.stringify([
      [this.CreateDIDEntry, this.version, this.nonce],
      this.didDocument
    ]);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http
      .post(this.apiUrl, data, httpOptions)
      .subscribe((res: any) => {
        this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.Final));
        this.spinner.hide();
        this.router.navigate([SharedRoutes.Final], { queryParams: { url: res.url } });
      });
  }

  private generateId(): string {
    this.nonce = toHexString(nacl.randomBytes(32));

    const chainId = calculateChainId([this.CreateDIDEntry, this.version, this.nonce]);
    this.id = `did:fctr:${chainId}`;
    return this.id;
  }

  private calculateEntrySize(hexExtIds: string[], utf8ExtIds: string[], content: string): number {
    let totalEntrySize = 0;
    const fixedHeaderSize = 35;
    totalEntrySize += fixedHeaderSize + 2 * hexExtIds.length + 2 * utf8ExtIds.length;

    totalEntrySize += hexExtIds.reduce((accumulator, currentHexExtId) => {
      return accumulator + currentHexExtId.length / 2;
    }, 0);

    totalEntrySize += utf8ExtIds.reduce((accumulator, currentUtf8ExtId) => {
      return accumulator + this.getBinarySize(currentUtf8ExtId);
    }, 0);

    totalEntrySize += this.getBinarySize(content);

    return totalEntrySize;
  }

  private getBinarySize(string): number {
    return Buffer.byteLength(string, 'utf8');
  }
}
