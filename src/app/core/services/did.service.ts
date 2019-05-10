declare const Buffer;
import * as nacl from 'tweetnacl/nacl-fast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AddOriginalAuthenticationKeys, AddOriginalPublicKeys, AddOriginalServices } from '../store/form/form.actions';
import { AppState } from '../store/app.state';
import { DIDDocument } from '../interfaces/did-document';
import { environment } from 'src/environments/environment';
import { KeyModel } from '../models/key.model';
import { ServiceModel } from '../models/service.model';
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
  private didDocument: DIDDocument;

  constructor (
    private http: HttpClient,
    private store: Store<AppState>) {
    this.store
     .pipe(select(state => state.form))
     .subscribe(form => {
        this.formPublicKeys = form.publicKeys;
        this.formAuthenticationKeys = form.authenticationKeys;
        this.formServices = form.services;
     });
  }

  generateDocument(): string {
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

    return JSON.stringify(this.didDocument, null, 2);
  }

  getId(): string {
    if (!this.id) {
      return this.generateId();
    }

    return this.id;
  }

  getDocumentSize(): number {
    return this.calculateEntrySize(
      [this.nonce],
      [this.CreateDIDEntry, this.version],
      JSON.stringify(this.didDocument)
    );
  }

  recordOnChain(): Observable<Object> {
    const data = JSON.stringify([
      [this.CreateDIDEntry, this.version, this.nonce],
      this.didDocument
    ]);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post(this.apiUrl, data, httpOptions);
  }

  clearData() {
    this.id = undefined;
    this.nonce = undefined;
    this.didDocument = undefined;
  }

  upload(didId: string) {
    console.log(didId);
    // call resolver to get did document
    // tslint:disable-next-line:max-line-length
    const response = `{"@context":"https://w3id.org/did/v1","id":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c","publicKey":[{"id":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c#myfirstkey","type":"Ed25519VerificationKey","controller":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c","publicKeyBase58":"GtRQwPQ6a8Qe9DbzBCTmBERovZ4URh7BvwziQMURRaEQ"},{"id":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c#mysecondkey","type":"ECDSASecp256k1VerificationKey","controller":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c","publicKeyBase58":"eeK7Saop24d3hej7r4BNgyna6pXrCEbgCTZYHj7ApkRh"}],"authentication":["did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c#myfirstkey",{"id":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c#mythirdkey","type":"Ed25519VerificationKey","controller":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c","publicKeyBase58":"2reWgag62C9ryZcCmheyzDVvQE5j9j1HCgVMbJBmoPvx"}],"service":[{"id":"did:fctr:f7a3860023452c7db222c7fd9d0e055b9ba3f9f9db02692b2eec8351c71b8e5c#myservice","type":"PhotoStreamService","serviceEndpoint":"https://example.org/photos/379283"}]}`;
    this.id = didId;
    this.didDocument = JSON.parse(response);
    this.parseDocument();
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

  private parseDocument() {
    const publicKeys = this.didDocument.publicKey.map(k => new KeyModel(
      k.id.split('#')[1],
      k.type,
      k.controller,
      k.publicKeyBase58
    ));

    const authenticationKeys = [];
    this.didDocument.authentication.forEach(k => {
      if (typeof k === 'string') {
        const key = publicKeys.find(pk => pk.alias === k.split('#')[1]);
        authenticationKeys.push(key);
      } else {
        authenticationKeys.push(new KeyModel(
          k.id.split('#')[1],
          k.type,
          k.controller,
          k.publicKeyBase58
        ));
      }
    });

    const services = this.didDocument.service.map(s => new ServiceModel(
      s.type,
      s.serviceEndpoint,
      s.id.split('#')[1]
    ));

    this.store.dispatch(new AddOriginalAuthenticationKeys(authenticationKeys));
    this.store.dispatch(new AddOriginalPublicKeys(publicKeys));
    this.store.dispatch(new AddOriginalServices(services));
  }
}
