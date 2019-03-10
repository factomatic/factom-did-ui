declare const Buffer;
import * as nacl from 'tweetnacl/nacl-fast';
import * as base58 from 'bs58';
import * as elliptic from 'elliptic';
import { Injectable } from '@angular/core';

import { KeyPairModel } from '../models/key-pair.model';

@Injectable()
export class KeysService {

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

    return new KeyPairModel(compressedPubPoint, privateKey);
  }
}
