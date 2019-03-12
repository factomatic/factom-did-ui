declare const Buffer;
import * as nacl from 'tweetnacl/nacl-fast';
import * as base58 from 'bs58';
import * as elliptic from 'elliptic';
import * as encryptor from 'browser-passworder';
import { defer, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { KeyPairModel } from '../models/key-pair.model';

@Injectable()
export class KeysService {
  private keys;

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(select(state => state.form))
      .subscribe(form => {
        this.keys = [];
        form.publicKeys.forEach(key => {
          this.keys.push({
            type: key.type,
            privateKey: key.privateKey
          });
        });

        form.authenticationKeys.forEach(key => {
          if (!this.keys.find(k => k.privateKey === key.privateKey)) {
            this.keys.push({
              type: key.type,
              privateKey: key.privateKey
            });
          }
        });
     });
  }

  generateEd25519KeyPair(): KeyPairModel {
    const seed = nacl.randomBytes(32);
    const keyPair = nacl.sign.keyPair.fromSeed(seed);

    const publicKeyBase58 = base58.encode(Buffer.from(keyPair.publicKey));
    const privateKeyBase58 = base58.encode(Buffer.from(keyPair.secretKey));

    return new KeyPairModel(publicKeyBase58, privateKeyBase58);
  }

  generateSecp256k1KeyPair(): KeyPairModel {
    const ec = new elliptic.ec('secp256k1');
    const key = ec.genKeyPair();

    const compressedPubPoint = key.getPublic(true, 'hex');
    const privateKey = key.getPrivate('hex');

    const publicKeyBase58 = base58.encode(Buffer.from(compressedPubPoint));
    const privateKeyBase58 = base58.encode(Buffer.from(privateKey));

    return new KeyPairModel(publicKeyBase58, privateKeyBase58);
  }

  encryptKeys(password: string): Observable<string> {
    return defer(async () => {
      const encryptedFile = await encryptor.encrypt(password, JSON.stringify(this.keys));
      return encryptedFile;
    });
  }
}
