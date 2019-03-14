import * as nacl from 'tweetnacl/nacl-fast';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { environment } from 'src/environments/environment';
import { KeyModel } from '../models/key.model';
import { ServiceModel } from '../models/service.model';
import { toHexString, calculateChainId } from '../utils/helpers';

@Injectable()
export class DIDService {
  private id: string;
  private nonce: string;
  private formPublicKeys: KeyModel[];
  private formAuthenticationKeys: KeyModel[];
  private formServices: ServiceModel[];
  private didDocument: Object;

  constructor (private store: Store<AppState>) {
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
      type: k.type,
      controller: k.controller,
      publicKeyBase58: k.publicKey
    }));

    const embeddedAuthenticationKeys = [];
    const fullAuthenticationKeys = [];
    this.formAuthenticationKeys.forEach(k => {
      if (this.formPublicKeys.includes(k)) {
        embeddedAuthenticationKeys.push(`${this.id}#${k.alias}`);
      } else {
        fullAuthenticationKeys.push({
          id: `${this.id}#${k.alias}`,
          type: k.type,
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
      '@context': 'https://example.org/example-method/v1',
      'id': this.id,
      'publicKey': publicKeys,
      'authentication': authenticationKeys,
      'service': services
    };

    return JSON.stringify(this.didDocument, null, 2);
  }

  generateId(): string {
    const method = 'Register DID';
    const version = environment.version;
    this.nonce = toHexString(nacl.randomBytes(32));

    const chainId = calculateChainId([method, version, this.nonce]);
    this.id = `did:fct:${chainId}`;
    return this.id;
  }

  getId(): string {
    return this.id;
  }

  save() {
  }
}
