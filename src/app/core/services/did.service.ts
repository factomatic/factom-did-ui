import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { KeyModel } from '../models/key.model';
import { ServiceModel } from '../models/service.model';

@Injectable()
export class DIDService {
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
      id: `did:example:123456789abcdefghi#${k.alias}`,
      type: k.type,
      controller: k.controller,
      publicKeyBase58: k.publicKey
    }));

    const embeddedAuthenticationKeys = [];
    const fullAuthenticationKeys = [];
    this.formAuthenticationKeys.forEach(k => {
      if (this.formPublicKeys.includes(k)) {
        embeddedAuthenticationKeys.push(`did:example:123456789abcdefghi#${k.alias}`);
      } else {
        fullAuthenticationKeys.push({
          id: `did:example:123456789abcdefghi#${k.alias}`,
          type: k.type,
          controller: k.controller,
          publicKeyBase58: k.publicKey
         });
      }
    });

    const authenticationKeys = embeddedAuthenticationKeys.concat(fullAuthenticationKeys);

    const services = this.formServices.map(s => ({
      id: `did:example:123456789abcdefghi#${s.alias}`,
      type: s.type,
      serviceEndpoint: s.endpoint
    }));

    this.didDocument = {
      '@context': 'https://example.org/example-method/v1',
      'id': 'did:example:123456789abcdefghi',
      'publicKey': publicKeys,
      'authentication': authenticationKeys,
      'service': services
    };

    return JSON.stringify(this.didDocument, null, 2);
  }

  save() {
  }
}
