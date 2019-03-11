declare const Buffer;
import * as nacl from 'tweetnacl/nacl-fast';
import * as base58 from 'bs58';
import * as elliptic from 'elliptic';
import * as encryptor from 'browser-passworder';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../store/app.state';
import { KeyPairModel } from '../models/key-pair.model';
import { defer, Observable } from 'rxjs';

@Injectable()
export class KeysService {
  private keys: string[] = [];

  constructor(private store: Store<AppState>) {
    this.store
     .pipe(select(state => state.form))
     .subscribe(form => {
       this.keys = form.publicKeys.map(k => k.privateKey);
       form.authenticationKeys.forEach(key => {
         if (!this.keys.includes(key.privateKey)) {
           this.keys.push(key.privateKey);
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
    const EC = elliptic.ec;
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();

    const pubPoint = key.getPublic();

    const x = pubPoint.getX();
    const y = pubPoint.getY();
    const pubXYHex = { x: x.toString('hex'), y: y.toString('hex') };
    console.log(pubXYHex);

    const pubHex = pubPoint.encode('hex');
    console.log('Public key: ' + pubHex);

    const compressedPubPoint = key.getPublic(true, 'hex');
    console.log('Compressed public key: ' + compressedPubPoint);

    const privateKey = key.getPrivate('hex');
    console.log('Private key: ' + privateKey);

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
